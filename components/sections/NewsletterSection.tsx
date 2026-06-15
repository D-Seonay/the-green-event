'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Gift, Sparkles } from 'lucide-react';
import WaveDivider from '../ui/WaveDivider';
import { ParallaxFloatingElement } from '../FloatingElements';
import Cube from '../ui/Cube';
import Leaf from '../ui/Leaf';
import { Badge } from '../ui/badge';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
    } catch (error: unknown) {
      setFormState('error');
      const message = error instanceof Error ? error.message : 'Une erreur est survenue.';
      setErrorMessage(message);
    }
  };

  return (
    <section className="relative bg-cream text-forest overflow-hidden py-24 md:py-32">
      <WaveDivider variant="forest-to-cream" className="absolute top-0 left-0 w-full" />
      
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <ParallaxFloatingElement 
          component={Cube} 
          size="lg" 
          blur 
          speed={0.2} 
          initialY={100} 
          className="top-20 -left-20 rotate-12"
        />
        <ParallaxFloatingElement 
          component={Leaf} 
          size="xl" 
          blur 
          speed={0.4} 
          initialY={300} 
          className="bottom-0 -right-32 -rotate-12"
        />
        <ParallaxFloatingElement 
          component={Leaf} 
          size="md" 
          speed={0.15} 
          initialY={200} 
          className="top-1/2 left-10 rotate-45"
        />
      </div>

      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        <div className="bg-forest rounded-[2rem] md:rounded-[4rem] p-8 md:p-16 shadow-2xl relative overflow-hidden group">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-leaf/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-leaf/20 transition-colors duration-1000" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-leaf/5 rounded-full -ml-32 -mb-32 blur-3xl group-hover:bg-leaf/10 transition-colors duration-1000" />

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mb-6 inline-block"
              >
                <Badge className="bg-leaf text-cream hover:bg-leaf text-sm md:text-base px-4 py-1 rounded-full uppercase font-black tracking-widest border-none">
                  <Gift className="w-4 h-4 mr-2 inline" />
                  Jeu Concours
                </Badge>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-display text-4xl md:text-6xl font-black text-cream uppercase leading-none tracking-tighter"
              >
                Gagnez votre <br />
                <span className="text-leaf italic">Pass 2 Jours</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-body mt-6 text-cream/80 text-lg md:text-xl leading-relaxed"
              >
                Inscrivez-vous à la newsletter pour tenter de remporter 2 pass VIP et recevoir toute la programmation en exclusivité.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex items-center justify-center lg:justify-start gap-2 text-leaf font-bold text-sm uppercase tracking-widest"
              >
                <Sparkles className="w-5 h-5" />
                <span>Tirage au sort en Juin</span>
              </motion.div>
            </div>

            {/* Form Side */}
            <div className="lg:w-1/2 w-full">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/10"
              >
                {formState === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 12 }}
                    >
                      <CheckCircle2 className="w-20 h-20 text-leaf" />
                    </motion.div>
                    <h3 className="font-display mt-6 text-3xl font-black text-cream uppercase tracking-tighter">C'est validé !</h3>
                    <p className="font-body mt-2 text-cream/70 text-lg">Bonne chance pour le tirage au sort.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        className="w-full px-6 py-5 rounded-2xl bg-cream text-forest placeholder:text-forest/50 border-2 border-transparent focus:border-leaf focus:ring-4 focus:ring-leaf/20 outline-none transition-all font-body text-lg"
                        disabled={formState === 'loading'}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formState === 'loading'}
                      className="w-full py-5 rounded-2xl bg-leaf text-cream font-display font-black text-xl uppercase tracking-widest hover:bg-leaf/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:scale-100 flex items-center justify-center shadow-xl shadow-leaf/20"
                    >
                      {formState === 'loading' ? (
                        <Loader2 className="animate-spin w-8 h-8" />
                      ) : (
                        "Je tente ma chance"
                      )}
                    </button>
                    <p className="text-cream/40 text-xs text-center font-body mt-4">
                      En vous inscrivant, vous acceptez de recevoir nos actualités. 
                      Vous pourrez vous désabonner à tout moment.
                    </p>
                  </form>
                )}
                {formState === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 mt-4 text-center font-medium"
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
