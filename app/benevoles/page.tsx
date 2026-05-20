"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Info,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion, useScroll, useTransform } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import WaveDivider from "@/components/ui/WaveDivider";
import Cube from "@/components/ui/Cube";
import Leaf from "@/components/ui/Leaf";

const FormSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  firstname: z.string().min(2, "Le prénom est requis"),
  birthDate: z
    .string()
    .min(1, "La date de naissance est requise")
    .refine((val) => {
      const birth = new Date(val);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age >= 18;
    }, "Tu dois être majeur·e pour être bénévole (18 ans minimum)"),
  city: z.string().min(2, "La ville est requise"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Téléphone invalide"),
  hasExperience: z.enum(["oui", "non"], { required_error: "Veuillez répondre à cette question" }),
  teamPref: z.string().optional(),
  wish1: z.string({ required_error: "Veuillez choisir votre souhait n°1" }),
  wish2: z.string({ required_error: "Veuillez choisir votre souhait n°2" }),
  wish3: z.string({ required_error: "Veuillez choisir votre souhait n°3" }),
  motivation: z
    .string()
    .min(10, "Minimum 10 caractères")
    .max(500, "Maximum 500 caractères"),
});

const FloatingIcon = ({ children, x, y, className }: { children: React.ReactNode, x: number[], y: number[], className: string }) => {
  const targetRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const yValue = useTransform(scrollYProgress, [0, 1], y);
  const xValue = useTransform(scrollYProgress, [0, 1], x);

  return (
    <motion.div ref={targetRef} style={{ y: yValue, x: xValue }} className={`absolute ${className} pointer-events-none opacity-10 hidden md:block`}>
      {children}
    </motion.div>
  );
};

const wishLabels: Record<string, string> = {
  brigade_verte: "Brigade Verte (avant 22h)",
  flyers: "Distribution de flyers (21 juin)",
  bar: "Bar",
  restauration: "Restauration",
  maquillage: "Maquillage",
};

const MISSION_WISHES = [
  { id: "brigade_verte", label: "Brigade Verte avant qu'il fasse nuit du festival à 22h" },
  { id: "flyers", label: "Distribution de flyers avant le festival pendant la fête de la musique (Vertou, nantes... le 21 juin)" },
  { id: "bar", label: "Bar" },
  { id: "restauration", label: "Restauration" },
  { id: "maquillage", label: "Maquillage" },
];

type SubmissionState = "idle" | "submitting" | "success" | "error";

const BenevolesPage = () => {
  const [submissionState, setSubmissionState] = React.useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      firstname: "",
      birthDate: "",
      city: "",
      email: "",
      phone: "",
      hasExperience: undefined,
      teamPref: "",
      wish1: "",
      wish2: "",
      wish3: "",
      motivation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setSubmissionState("submitting");
    setErrorMessage("");
    try {
      const response = await fetch("/api/benevoles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Une erreur est survenue lors de l'envoi.");
      }

      setSubmissionState("success");
      toast({
        title: "Candidature reçue !",
        description: "Merci pour ton engagement ! On revient vers toi très vite.",
      });
    } catch (err: any) {
      setSubmissionState("error");
      setErrorMessage(err.message || "Une erreur est survenue.");
      toast({
        variant: "destructive",
        title: "Erreur lors de la soumission",
        description: err.message || "Impossible d'envoyer la candidature.",
      });
    }
  };

  return (
    <main className="bg-forest text-cream min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 px-4">
        <FloatingIcon x={[-100, 100]} y={[-50, 50]} className="top-20 left-10">
          <Cube className="w-24 h-24 text-cream" />
        </FloatingIcon>
        <FloatingIcon x={[50, -50]} y={[20, -20]} className="top-40 right-10">
          <Leaf className="w-32 h-32 text-leaf" />
        </FloatingIcon>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative inline-block mb-8 max-w-full">
              <div className="absolute -inset-2 md:-inset-4 bg-leaf rounded-lg shadow-xl transform rotate-2"></div>
              <h1 className="relative bg-cream text-forest px-4 py-3 md:px-8 md:py-4 text-2xl sm:text-4xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tighter italic break-words text-center">
                DEVENIR BÉNÉVOLE
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl text-lg md:text-2xl font-body text-cream/80 leading-relaxed"
            >
              Rejoins la <span className="text-leaf font-bold">Green Team</span>  et participe à l&apos;aventure de l&apos;intérieur.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <WaveDivider variant="forest-to-cream" flip={false} />

      {/* Informations Section */}
      <section className="bg-cream py-16 md:py-32 relative text-forest">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-black uppercase tracking-tight mb-6 text-[#052013]">
                Être bénévole au Green Fest
              </h2>
              <p className="text-lg font-body leading-relaxed text-forest/90 mb-6">
                C&apos;est rejoindre une équipe engagée et faire partie de l&apos;aventure de l&apos;intérieur :
              </p>
              <ul className="space-y-4 font-body text-base md:text-lg list-disc pl-6 text-forest/80">
                <li>
                  Donner de ton énergie et de ton temps pour offrir aux <span className="font-bold text-[#052013]">500 festivalier·es</span> une journée inoubliable dans un cadre naturel préservé.
                </li>
                <li>
                  Vivre le festival autrement, faire des rencontres sincères, partager des moments uniques avec d&apos;autres bénévoles et des passionné·es de culture et d&apos;écologie venu·es de tous horizons.
                </li>
                <li>
                  Porter les valeurs de <span className="font-bold text-[#052013]">THE GREEN EVENT</span> et contribuer concrètement à un projet culturel engagé pour l&apos;environnement.
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-forest/10">
              <div className="space-y-6">
                <div>
                  <h4 className="font-display font-bold uppercase tracking-wider text-sm text-[#00A651]">Condition</h4>
                  <p className="font-body text-base text-forest/90 mt-1">Être majeur·e</p>
                </div>
                <div>
                  <h4 className="font-display font-bold uppercase tracking-wider text-sm text-[#00A651]">Disponibilité</h4>
                  <p className="font-body text-base text-[#052013] mt-1">
                    Être disponible le jour du festival — <span className="font-bold">4 juillet 2026</span> au Parc des Viviers, Vertou
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-display font-bold uppercase tracking-wider text-sm text-[#00A651]">Choix des missions</h4>
                  <p className="font-body text-sm text-forest/80 mt-1 leading-relaxed">
                    On fera de notre mieux pour tenir compte de tes souhaits, mais on ne peut pas garantir de satisfaire tout le monde. Il est donc possible qu&apos;on te propose une mission différente de celle indiquée. Merci pour ta compréhension !
                  </p>
                </div>
                <div>
                  <h4 className="font-display font-bold uppercase tracking-wider text-sm text-[#00A651]">Horaires</h4>
                  <p className="font-body text-sm text-forest/80 mt-1 leading-relaxed">
                    Les plannings sont organisés selon les besoins des équipes. Si tu veux être sûr·e de profiter pleinement de la programmation, mieux vaut venir en tant que festivalier·ère 🌿
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <WaveDivider variant="cream-to-forest" flip={false} className="bg-forest" />

      {/* Form Section */}
      <section className="py-16 md:py-28 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="relative">
            {/* Form Decorative Background */}
            <div className="absolute inset-0 bg-leaf/20 blur-3xl rounded-full scale-110 opacity-50"></div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-cream text-forest p-5 sm:p-8 md:p-16 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border-4 border-forest rotate-0 md:-rotate-1"
            >
              {submissionState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-leaf rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-leaf/20 transform rotate-3">
                    <CheckCircle2 className="w-12 h-12 text-cream" />
                  </div>
                  <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-black uppercase tracking-tighter mb-6 text-[#052013]">
                    BIENVENUE DANS LA TEAM !
                  </h2>
                  <p className="max-w-xl mx-auto font-body text-lg md:text-xl text-forest/80 leading-relaxed mb-10">
                    Ta candidature a bien été transmise à notre coordinateur. Un e-mail de confirmation récapitulant tes préférences vient de t'être envoyé !
                  </p>

                  <div className="max-w-md mx-auto bg-forest text-cream p-5 rounded-xl text-left border-2 border-forest shadow-xl mb-10 rotate-0 md:transform md:-rotate-1">
                    <h3 className="font-display font-bold text-lg uppercase tracking-wider border-b border-cream/20 pb-3 mb-4">
                      Récapitulatif de tes choix
                    </h3>
                    <div className="space-y-3 font-body text-sm">
                      <p><span className="text-leaf font-bold uppercase tracking-wider text-xs block mb-1">Candidat</span>{form.getValues("firstname")} {form.getValues("name")}</p>
                      <p><span className="text-leaf font-bold uppercase tracking-wider text-xs block mb-1">Ville</span>{form.getValues("city")}</p>
                      <p><span className="text-leaf font-bold uppercase tracking-wider text-xs block mb-1">Souhait 1</span>{wishLabels[form.getValues("wish1")] || form.getValues("wish1")}</p>
                      <p><span className="text-leaf font-bold uppercase tracking-wider text-xs block mb-1">Souhait 2</span>{wishLabels[form.getValues("wish2")] || form.getValues("wish2")}</p>
                      <p><span className="text-leaf font-bold uppercase tracking-wider text-xs block mb-1">Souhait 3</span>{wishLabels[form.getValues("wish3")] || form.getValues("wish3")}</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      form.reset();
                      setSubmissionState("idle");
                    }}
                    className="bg-[#0a3f25] text-white hover:bg-[#00A651] h-14 px-8 rounded-xl text-sm font-display font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    Soumettre une autre candidature
                  </Button>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-black uppercase tracking-tighter mb-4 text-[#052013]">
                      Formulaire d&apos;inscription
                    </h2>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="flex items-center justify-center gap-2 text-forest/60 font-mono uppercase tracking-widest text-sm">
                        <Info className="w-4 h-4" />
                        Formulaire de candidature
                      </div>
                      <div className="text-forest/50 font-body text-xs font-semibold uppercase tracking-wider">
                        * Les champs avec astérisque sont obligatoires
                      </div>
                    </div>
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 md:space-y-12 text-[#052013]">
                      {/* Identity */}
                      <div className="space-y-6 md:space-y-8">
                        <h3 className="text-lg md:text-xl font-display font-black uppercase tracking-widest border-b-2 border-forest/10 pb-2 text-[#052013]">
                          01. Identité <span className="text-red-500 text-sm">*</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                          <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold uppercase tracking-wider text-xs">Prénom <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                  <Input placeholder="Jean" {...field} disabled={submissionState === "submitting"} className="bg-transparent border-forest/20 focus:border-leaf rounded-xl h-12" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold uppercase tracking-wider text-xs">Nom <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                  <Input placeholder="Dupont" {...field} disabled={submissionState === "submitting"} className="bg-transparent border-forest/20 focus:border-leaf rounded-xl h-12" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold uppercase tracking-wider text-xs">Email <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                  <Input placeholder="jean@mail.com" {...field} disabled={submissionState === "submitting"} className="bg-transparent border-forest/20 focus:border-leaf rounded-xl h-12" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold uppercase tracking-wider text-xs">Téléphone <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                  <Input placeholder="06 00 00 00 00" {...field} disabled={submissionState === "submitting"} className="bg-transparent border-forest/20 focus:border-leaf rounded-xl h-12" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                          <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold uppercase tracking-wider text-xs">Date de naissance <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} disabled={submissionState === "submitting"} className="bg-transparent border-forest/20 focus:border-leaf rounded-xl h-12" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold uppercase tracking-wider text-xs">Ville <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                  <Input placeholder="Vertou" {...field} disabled={submissionState === "submitting"} className="bg-transparent border-forest/20 focus:border-leaf rounded-xl h-12" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Experience and Team Preference */}
                      <div className="space-y-6 md:space-y-8">
                        <h3 className="text-lg md:text-xl font-display font-black uppercase tracking-widest border-b-2 border-forest/10 pb-2 text-[#052013]">
                          02. Expérience &amp; Binôme
                        </h3>
                        <FormField
                          control={form.control}
                          name="hasExperience"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="font-bold uppercase tracking-wider text-xs">As-tu déjà eu d&apos;autres expériences bénévoles ? <span className="text-red-500">*</span></FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  disabled={submissionState === "submitting"}
                                  className="flex gap-8"
                                >
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="oui" className="border-forest text-forest focus:ring-leaf" />
                                    </FormControl>
                                    <FormLabel className="font-bold cursor-pointer text-sm">Oui</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="non" className="border-forest text-forest focus:ring-leaf" />
                                    </FormControl>
                                    <FormLabel className="font-bold cursor-pointer text-sm">Non</FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="teamPref"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bold uppercase tracking-wider text-xs">Tu aimerais être dans la même équipe qu&apos;une autre personne ?</FormLabel>
                              <FormControl>
                                <Input placeholder="Prénom et nom de ton ami(e)" {...field} disabled={submissionState === "submitting"} className="bg-transparent border-forest/20 focus:border-leaf rounded-xl h-12" />
                              </FormControl>
                              <FormDescription className="text-xs text-forest/60">
                                Laisse vide si tu n&apos;as pas de préférence particulière.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Wishes */}
                      <div className="space-y-6 md:space-y-8">
                        <h3 className="text-lg md:text-xl font-display font-black uppercase tracking-widest border-b-2 border-forest/10 pb-2 text-[#052013]">
                          03. Tes souhaits de mission <span className="text-red-500 text-sm">*</span>
                        </h3>
                        <p className="text-xs md:text-sm font-body text-forest/70 -mt-2 md:-mt-4">
                          Indique-nous tes trois préférences de mission par ordre de priorité.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                          <FormField
                            control={form.control}
                            name="wish1"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold uppercase tracking-wider text-xs">Souhait n°1 <span className="text-red-500">*</span></FormLabel>
                                <Select onValueChange={field.onChange} value={field.value} disabled={submissionState === "submitting"}>
                                  <FormControl>
                                    <SelectTrigger className="bg-transparent border-forest/20 focus:border-leaf rounded-xl h-12 text-[#052013]">
                                      <SelectValue placeholder="Choisir" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-[#FEF7E0] text-[#052013] border-forest/20 max-w-[calc(100vw-2.5rem)] sm:max-w-xs md:max-w-sm">
                                    {MISSION_WISHES.map((wish) => (
                                      <SelectItem key={wish.id} value={wish.id} className="focus:bg-[#00A651]/10 focus:text-[#00A651] whitespace-normal break-words py-2">
                                        {wish.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="wish2"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold uppercase tracking-wider text-xs">Souhait n°2 <span className="text-red-500">*</span></FormLabel>
                                <Select onValueChange={field.onChange} value={field.value} disabled={submissionState === "submitting"}>
                                  <FormControl>
                                    <SelectTrigger className="bg-transparent border-forest/20 focus:border-leaf rounded-xl h-12 text-[#052013]">
                                      <SelectValue placeholder="Choisir" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-[#FEF7E0] text-[#052013] border-forest/20 max-w-[calc(100vw-2.5rem)] sm:max-w-xs md:max-w-sm">
                                    {MISSION_WISHES.map((wish) => (
                                      <SelectItem key={wish.id} value={wish.id} className="focus:bg-[#00A651]/10 focus:text-[#00A651] whitespace-normal break-words py-2">
                                        {wish.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="wish3"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-bold uppercase tracking-wider text-xs">Souhait n°3 <span className="text-red-500">*</span></FormLabel>
                                <Select onValueChange={field.onChange} value={field.value} disabled={submissionState === "submitting"}>
                                  <FormControl>
                                    <SelectTrigger className="bg-transparent border-forest/20 focus:border-leaf rounded-xl h-12 text-[#052013]">
                                      <SelectValue placeholder="Choisir" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-[#FEF7E0] text-[#052013] border-forest/20 max-w-[calc(100vw-2.5rem)] sm:max-w-xs md:max-w-sm">
                                    {MISSION_WISHES.map((wish) => (
                                      <SelectItem key={wish.id} value={wish.id} className="focus:bg-[#00A651]/10 focus:text-[#00A651] whitespace-normal break-words py-2">
                                        {wish.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Motivation */}
                      <div className="space-y-6 md:space-y-8">
                        <h3 className="text-lg md:text-xl font-display font-black uppercase tracking-widest border-b-2 border-forest/10 pb-2 text-[#052013]">
                          04. Motivation <span className="text-red-500 text-sm">*</span>
                        </h3>
                        <FormField
                          control={form.control}
                          name="motivation"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder="Pourquoi souhaites-tu nous rejoindre ?"
                                  disabled={submissionState === "submitting"}
                                  className="min-h-[150px] bg-transparent border-forest/20 focus:border-leaf rounded-2xl p-6 text-[#052013]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="text-center pt-8">
                        <Button
                          type="submit"
                          disabled={submissionState === "submitting"}
                          className="bg-forest text-cream hover:bg-leaf hover:text-forest h-16 px-12 rounded-2xl text-lg font-display font-black uppercase tracking-widest transition-all duration-500 shadow-xl hover:shadow-leaf/20 group"
                        >
                          {submissionState === "submitting" ? (
                            <>
                              Envoi en cours...
                              <Loader2 className="ml-3 w-5 h-5 animate-spin" />
                            </>
                          ) : (
                            <>
                              Envoyer ma candidature
                              <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BenevolesPage;
