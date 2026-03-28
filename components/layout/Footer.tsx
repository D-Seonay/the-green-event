"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Mail, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WaveDivider from "@/components/ui/WaveDivider";

type FormState = 'idle' | 'loading' | 'success' | 'error';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/the_greenevents/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/people/The-green-event/61557653626678/#", label: "Facebook" },
    // { icon: Tiktok, href: "#", label: "Twitter" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setFormState('error');
      setErrorMessage('Veuillez entrer une adresse email.');
      return;
    }
    setFormState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Une erreur est survenue.');
      }

      setFormState('success');
    } catch (error: any) {
      setFormState('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <footer className="relative">
      {/* Wave Transition */}
      <WaveDivider variant="forest-to-cream" className="-mt-1 bg-cream" />

      <div className="bg-forest py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 items-start">
            {/* Logo & Description */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center md:text-left"
            >
              <Image
                src="/logo.png"
                alt="The Green Event"
                width={80}
                height={80}
                className="h-16 md:h-20 w-auto mx-auto md:mx-0 mb-6"
              />
              <h3 className="font-display font-black text-cream text-2xl md:text-3xl mb-3 tracking-tighter uppercase">
                THE GREEN EVENT
              </h3>
              <p className="font-body text-cream/70 text-lg max-w-xs mx-auto md:mx-0 leading-relaxed">
                Le festival électronique au cœur de la nature. Vertou, été 2026.
              </p>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center md:text-left lg:mx-auto"
            >
              <h4 className="font-display font-black text-cream text-xl mb-6 uppercase tracking-tighter">
                Newsletter
              </h4>
              <p className="font-body text-cream/70 mb-6 text-base leading-relaxed">
                Recevez en avant-première les annonces et les offres exclusives.
              </p>
              {formState === 'success' ? (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-leaf/20 border border-leaf/30">
                  <CheckCircle2 className="w-6 h-6 text-leaf" />
                  <p className="font-body text-cream font-medium">Merci ! Vous êtes inscrit.</p>
                </div>
              ) : (
                <form
                  className="flex gap-2 max-w-sm mx-auto md:mx-0"
                  onSubmit={handleSubmit}
                >
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    className="h-12 bg-cream/10 border-cream/20 text-cream placeholder:text-cream/50 focus:border-leaf focus:ring-1 focus:ring-leaf rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={formState === 'loading'}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    aria-label="S'inscrire à la newsletter"
                    className="h-12 w-12 bg-leaf hover:bg-leaf/90 text-cream flex-shrink-0 rounded-xl transition-all duration-300 hover:scale-105"
                    disabled={formState === 'loading'}
                  >
                    {formState === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </Button>
                </form>
              )}
              {formState === 'error' && (
                <p className="text-red-400 mt-3 text-sm font-medium">{errorMessage}</p>
              )}
            </motion.div>

            {/* Social & Contact */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center md:text-left lg:text-right"
            >
              <h4 className="font-display font-black text-cream text-xl mb-6 uppercase tracking-tighter">
                Suivez-nous
              </h4>
              <div className="flex gap-4 justify-center md:justify-start lg:justify-end mb-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 rounded-xl bg-cream/10 hover:bg-leaf flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-6 group"
                  >
                    <social.icon className="w-6 h-6 text-cream group-hover:text-white" />
                  </a>
                ))}
              </div>
              <a
                href="mailto:thegreenevent.44@gmail.com"
                aria-label="Envoyez-nous un email"
                className="inline-flex items-center gap-3 font-body text-cream/70 hover:text-leaf transition-all duration-300 text-lg group"
              >
                <div className="w-10 h-10 rounded-xl bg-cream/5 flex items-center justify-center group-hover:bg-leaf/10 group-hover:scale-110 transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                thegreenevent.44@gmail.com
              </a>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-cream/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <span className="font-body text-cream/70 text-sm">
                © 2026 The Green Event. Tous droits réservés.
              </span>
              <span className="hidden md:block text-cream/20">|</span>
              <span className="font-body text-cream/70 text-sm">
                Réalisé par <a href="https://matheodelaunay.studio" target="_blank" rel="noopener noreferrer" className="text-leaf hover:text-cream transition-colors duration-300 font-bold underline decoration-leaf/30 underline-offset-4">Seonay</a>
              </span>
            </div>

              <div className="flex gap-6">
                <a href="/mentions-legales" className="font-body text-cream/70 hover:text-cream text-sm transition-colors">
                  Mentions légales
                </a>
                <a href="/cgv" className="font-body text-cream/70 hover:text-cream text-sm transition-colors">
                  CGV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;