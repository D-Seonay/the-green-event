"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Ban,
  Beer,
  Drum,
  HandPlatter,
  HeartHandshake,
  Shirt,
  Ticket,
  Wrench,
  ArrowRight,
  Info,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion, useScroll, useTransform } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { toast } from "@/components/ui/use-toast";
import WaveDivider from "@/components/ui/WaveDivider";
import Cube from "@/components/ui/Cube";
import Leaf from "@/components/ui/Leaf";

const FormSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  firstname: z.string().min(2, "Le prénom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Téléphone invalide"),
  age: z
    .string()
    .refine((value) => /^\d+$/.test(value), "L'âge doit être un nombre")
    .refine((value) => parseInt(value) >= 18, "Minimum 18 ans"),
  availabilities: z
    .array(z.string())
    .refine((value) => value.length > 0, "Sélectionnez au moins un créneau"),
  assignement: z.string({ required_error: "Choisissez un poste" }),
  motivation: z
    .string()
    .min(10, "Minimum 10 caractères")
    .max(500, "Maximum 500 caractères"),
});

const perks = [
  {
    title: "Accès Festival",
    icon: <Ticket className="w-8 h-8 text-cream" />,
    description: "Profitez des concerts et de l'ambiance unique.",
    rotation: -3,
  },
  {
    title: "Repas & Softs",
    icon: <HandPlatter className="w-8 h-8 text-cream" />,
    description: "On s'occupe de ton énergie pendant tes shifts.",
    rotation: 2,
  },
  {
    title: "T-Shirt Crew",
    icon: <Shirt className="w-8 h-8 text-cream" />,
    description: "Affiche fièrement ton appartenance à la Green Team.",
    rotation: -2,
  },
  {
    title: "Aventure Humaine",
    icon: <HeartHandshake className="w-8 h-8 text-cream" />,
    description: "Rencontre des passionnés et crée des souvenirs.",
    rotation: 4,
  },
];

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

const BenevolesPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      firstname: "",
      email: "",
      phone: "",
      age: "",
      availabilities: [],
      assignement: "polyvalent",
      motivation: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Form data", data);
    toast({
      title: "Candidature reçue !",
      description: "Merci pour ton engagement ! On revient vers toi très vite.",
    });
  };

  return (
    <main className="bg-forest text-cream min-h-screen overflow-hidden">
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
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-4 bg-leaf rounded-lg shadow-xl transform rotate-2"></div>
              <h1 className="relative bg-cream text-forest px-8 py-4 text-5xl md:text-8xl font-display font-black uppercase tracking-tighter italic">
                BÉNÉVOLES
              </h1>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl text-lg md:text-2xl font-body text-cream/80 leading-relaxed"
            >
              Rejoins la <span className="text-leaf font-bold">Green Team</span> et participe à l&apos;aventure 
              éco-responsable du Parc de la Sèvre. On a besoin de ton énergie !
            </motion.p>
          </motion.div>
        </div>
      </section>

      <WaveDivider variant="forest-to-cream" flip={false} />

      {/* Perks Section */}
      <section className="bg-cream py-24 md:py-40 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {perks.map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, rotate: perk.rotation }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-forest p-8 rounded-3xl shadow-2xl text-center group hover:scale-105 transition-all duration-500"
              >
                <div className="flex justify-center items-center h-20 w-20 bg-leaf rounded-2xl mx-auto mb-6 shadow-lg transform group-hover:rotate-12 transition-transform">
                  {perk.icon}
                </div>
                <h3 className="text-2xl font-display font-black text-cream uppercase tracking-tight mb-4">
                  {perk.title}
                </h3>
                <p className="text-cream/70 font-body text-sm leading-relaxed">
                  {perk.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider variant="cream-to-forest" flip={false} className="bg-forest" />

      {/* Form Section */}
      <section className="py-24 md:py-40 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="relative">
            {/* Form Decorative Background */}
            <div className="absolute inset-0 bg-leaf/20 blur-3xl rounded-full scale-110 opacity-50"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-cream text-forest p-8 md:p-16 rounded-[2rem] shadow-2xl border-4 border-forest transform -rotate-1"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter mb-4">
                  REJOINDRE L&apos;ÉQUIPE
                </h2>
                <div className="flex items-center justify-center gap-2 text-forest/60 font-mono uppercase tracking-widest text-sm">
                  <Info className="w-4 h-4" />
                  Formulaire de candidature
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                  {/* Identity */}
                  <div className="space-y-8">
                    <h3 className="text-xl font-display font-black uppercase tracking-widest border-b-2 border-forest/10 pb-2">
                      01. Identité
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold uppercase tracking-wider text-xs">Prénom</FormLabel>
                            <FormControl>
                              <Input placeholder="Jean" {...field} className="bg-transparent border-forest/20 focus:border-leaf rounded-xl h-12" />
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
                            <FormLabel className="font-bold uppercase tracking-wider text-xs">Nom</FormLabel>
                            <FormControl>
                              <Input placeholder="Dupont" {...field} className="bg-transparent border-forest/20 focus:border-leaf rounded-xl h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold uppercase tracking-wider text-xs">Email</FormLabel>
                            <FormControl>
                              <Input placeholder="jean@mail.com" {...field} className="bg-transparent border-forest/20 focus:border-leaf rounded-xl h-12" />
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
                            <FormLabel className="font-bold uppercase tracking-wider text-xs">Téléphone</FormLabel>
                            <FormControl>
                              <Input placeholder="06 00 00 00 00" {...field} className="bg-transparent border-forest/20 focus:border-leaf rounded-xl h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem className="max-w-[200px]">
                          <FormLabel className="font-bold uppercase tracking-wider text-xs">Âge</FormLabel>
                          <FormControl>
                            <Input placeholder="25" {...field} className="bg-transparent border-forest/20 focus:border-leaf rounded-xl h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Availabilities */}
                  <div className="space-y-8">
                    <h3 className="text-xl font-display font-black uppercase tracking-widest border-b-2 border-forest/10 pb-2">
                      02. Disponibilités
                    </h3>
                    <FormField
                      control={form.control}
                      name="availabilities"
                      render={() => (
                        <FormItem>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                              { id: "montage", label: "Montage (Juin)" },
                              { id: "samedi", label: "Samedi 4 Juillet" },
                              { id: "dimanche", label: "Dimanche 5 Juillet" },
                              { id: "demontage", label: "Démontage" },
                            ].map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="availabilities"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-3 space-y-0 p-4 rounded-2xl border border-forest/10 hover:border-leaf hover:bg-leaf/5 transition-all cursor-pointer">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, item.id])
                                            : field.onChange(field.value?.filter((val) => val !== item.id));
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-bold cursor-pointer">{item.label}</FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Preferences */}
                  <div className="space-y-8">
                    <h3 className="text-xl font-display font-black uppercase tracking-widest border-b-2 border-forest/10 pb-2">
                      03. Poste Souhaité
                    </h3>
                    <FormField
                      control={form.control}
                      name="assignement"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                            >
                              {[
                                { value: "bar", label: "Bar & Resto", icon: Beer },
                                { value: "eco", label: "Éco-Brigade", icon: Ban },
                                { value: "accueil", label: "Accueil", icon: Ticket },
                                { value: "technique", label: "Technique", icon: Wrench },
                                { value: "polyvalent", label: "Polyvalent", icon: Drum },
                              ].map((item) => (
                                <FormItem key={item.value}>
                                  <FormControl>
                                    <RadioGroupItem value={item.value} className="sr-only" />
                                  </FormControl>
                                  <FormLabel className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${field.value === item.value ? 'bg-forest text-cream border-forest' : 'border-forest/10 hover:border-leaf hover:bg-leaf/5'}`}>
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-bold text-sm">{item.label}</span>
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Motivation */}
                  <div className="space-y-8">
                    <h3 className="text-xl font-display font-black uppercase tracking-widest border-b-2 border-forest/10 pb-2">
                      04. Motivation
                    </h3>
                    <FormField
                      control={form.control}
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Pourquoi souhaites-tu nous rejoindre ?"
                              className="min-h-[150px] bg-transparent border-forest/20 focus:border-leaf rounded-2xl p-6"
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
                      className="bg-forest text-cream hover:bg-leaf hover:text-forest h-16 px-12 rounded-2xl text-lg font-display font-black uppercase tracking-widest transition-all duration-500 shadow-xl hover:shadow-leaf/20 group"
                    >
                      Envoyer ma candidature
                      <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BenevolesPage;
