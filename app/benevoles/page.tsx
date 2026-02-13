import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
"use client";

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
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import WaveDivider from "@/components/ui/WaveDivider";

const MAX_ISSUES = 3;

const FormSchema = z.object({
  // Personal information
  name: z.string({ required_error: "Le nom est requis" }),
  firstname: z.string({ required_error: "Le prénom est requis" }),
  email: z.string({ required_error: "L'email est requis" }).email(),
  phone: z.string({ required_error: "Le téléphone est requis" }),
  age: z
    .string()
    .refine((value) => /^\d+$/.test(value), {
      message: "L'âge doit être un nombre valide.",
    })
    .refine((value) => parseInt(value) >= 18, {
      message: "Vous devez avoir au moins 18 ans pour être bénévole.",
    })
    .refine((value) => parseInt(value) <= 100, {
      message: "L'âge ne peut pas dépasser 100 ans.",
    }),
  // Availabilities
  availabilities: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "Vous devez sélectionner au moins une disponibilité.",
    }),
  // Assignement
  assignement: z.string({ required_error: "Vous devez choisir un poste" }),
  // Motivation
  motivation: z
    .string()
    .min(10, {
      message: "Votre message doit contenir au moins 10 caractères.",
    })
    .max(500, {
      message: "Votre message doit contenir au maximum 500 caractères.",
    }),
});

const perks = [
  {
    title: "Accès Gratuit au Festival",
    icon: <Ticket className="w-8 h-8 text-cream" />,
    description:
      "Profitez de tous les concerts et de l'ambiance du festival sans dépenser un centime.",
  },
  {
    title: "Repas & Boissons offerts",
    icon: <HandPlatter className="w-8 h-8 text-cream" />,
    description:
      "Nous vous offrons les repas et les boissons pour que vous ne manquiez de rien.",
  },
  {
    title: "Goodies Exclusifs",
    icon: <Shirt className="w-8 h-8 text-cream" />,
    description:
      "Recevez un t-shirt et d'autres goodies uniques pour montrer que vous faites partie de la Green Team.",
  },
  {
    title: "Ambiance de folie",
    icon: <HeartHandshake className="w-8 h-8 text-cream" />,
    description:
      "Rejoignez une équipe de passionnés et vivez des moments inoubliables.",
  },
];

const availabilities = [
  {
    id: "assembly",
    label: "Montage (Juin)",
  },
  {
    id: "saturday",
    label: "Samedi",
  },
  {
    id: "sunday",
    label: "Dimanche",
  },
  {
    id: "disassembly",
    label: "Démontage",
  },
];

const assignements = [
  {
    value: "bar",
    label: "Bar/Restauration",
    icon: <Beer className="w-4 h-4" />,
  },
  {
    value: "eco-brigade",
    label: "Eco-Brigade (Tri)",
    icon: <Ban className="w-4 h-4" />,
  },
  {
    value: "reception",
    label: "Accueil/Billetterie",
    icon: <Ticket className="w-4 h-4" />,
  },
  {
    value: "technique",
    label: "Technique",
    icon: <Wrench className="w-4 h-4" />,
  },
  {
    value: "polyvalent",
    label: "Peu importe !",
    icon: <Drum className="w-4 h-4" />,
  },
];

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
      title: "Candidature envoyée !",
      description:
        "Merci pour votre intérêt ! Nous vous recontacterons très bientôt.",
    });
  };

  return (
    <main>
    <Navbar />
    <div className="bg-forest text-cream">
      <div className="container mx-auto px-4 md:px-6">
        <div className="py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold"
          >
            REJOINS LA GREEN TEAM !
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl"
          >
            Vis le festival de l'intérieur et participe à une aventure humaine
            unique à Vertou.
          </motion.p>
        </div>


        <div className="pb-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2, delayChildren: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {perks.map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-300 ease-in-out"
                style={{
                  transform: `rotate(${index % 2 === 0 ? "2deg" : "-2deg"})`,
                }}
              >
                <div className="flex justify-center items-center h-16 w-16 bg-leaf rounded-full mx-auto mb-4">
                  {perk.icon}
                </div>
                <h3 className="text-xl font-bold">{perk.title}</h3>
                <p className="mt-2 text-sm">{perk.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="pb-24"
        >
          <div className="bg-cream text-forest p-8 md:p-12 rounded-lg transform -rotate-1 shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8">
              Postule maintenant
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Entrez votre nom"
                            {...field}
                            className="bg-transparent border-forest/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Entrez votre prénom"
                            {...field}
                            className="bg-transparent border-forest/50"
                          />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Entrez votre email"
                            {...field}
                            className="bg-transparent border-forest/50"
                          />
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
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Entrez votre téléphone"
                            {...field}
                            className="bg-transparent border-forest/50"
                          />
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
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Entrez votre âge"
                          {...field}
                          className="bg-transparent border-forest/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="availabilities"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">
                          Vos disponibilités
                        </FormLabel>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {availabilities.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="availabilities"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assignement"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Poste souhaité</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {assignements.map((assignement) => (
                            <FormItem
                              className="flex items-center space-x-3 space-y-0"
                              key={assignement.value}
                            >
                              <FormControl>
                                <RadioGroupItem value={assignement.value} />
                              </FormControl>
                              <FormLabel className="font-normal flex items-center gap-x-2">
                                {assignement.icon} {assignement.label}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="motivation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Motivation</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Parlez-nous de votre motivation à rejoindre la Green Team..."
                          className="resize-none bg-transparent border-forest/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-center">
                  <Button
                    type="submit"
                    className="bg-leaf hover:bg-leaf/90 text-cream font-bold py-3 px-8 rounded-full"
                  >
                    ENVOYER MA CANDIDATURE
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </div>
    <Footer />
  </main>
  );
};

export default BenevolesPage;