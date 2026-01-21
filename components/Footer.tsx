"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WaveDivider from "./WaveDivider";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="relative">
      {/* Wave Transition */}
      <WaveDivider variant="forest-to-cream" className="-mt-1 bg-cream" />

      <div className="bg-forest py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 items-start">
            {/* Logo & Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <Image
                src="/logo.png"
                alt="The Green Event"
                width={80}
                height={80}
                className="h-16 md:h-20 w-auto mx-auto md:mx-0 mb-4"
              />
              <h3 className="font-display font-black text-cream text-xl md:text-2xl mb-2">
                THE GREEN EVENT
              </h3>
              <p className="font-body text-cream/70 max-w-xs mx-auto md:mx-0">
                Le festival électronique au cœur de la nature. Vertou, été 2026.
              </p>
            </motion.div>
            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center md:text-left lg:mx-auto"
            >
              <h4 className="font-display font-bold text-cream text-lg mb-4">
                Newsletter
              </h4>
              <p className="font-body text-cream/70 mb-4 text-sm">
                Recevez en avant-première les annonces et les offres exclusives.
              </p>
              <form 
                className="flex gap-2 max-w-sm mx-auto md:mx-0"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  className="bg-cream/10 border-cream/20 text-cream placeholder:text-cream/50 focus:border-leaf"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="bg-leaf hover:bg-leaf/90 text-cream flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </motion.div>

            {/* Social & Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center md:text-left lg:text-right"
            >
              <h4 className="font-display font-bold text-cream text-lg mb-4">
                Suivez-nous
              </h4>
              <div className="flex gap-4 justify-center md:justify-start lg:justify-end mb-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-cream/10 hover:bg-leaf flex items-center justify-center transition-colors duration-300"
                  >
                    <social.icon className="w-5 h-5 text-cream" />
                  </a>
                ))}
              </div>
              <a
                href="mailto:contact@thegreenevent.fr"
                className="inline-flex items-center gap-2 font-body text-cream/70 hover:text-leaf transition-colors"
              >
                <Mail className="w-4 h-4" />
                contact@thegreenevent.fr
              </a>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-cream/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="font-body text-cream/50 text-sm">
                © 2026 The Green Event. Tous droits réservés.
              </p>
              <div className="flex gap-6">
                <a href="#" className="font-body text-cream/50 hover:text-cream text-sm transition-colors">
                  Mentions légales
                </a>
                <a href="#" className="font-body text-cream/50 hover:text-cream text-sm transition-colors">
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
