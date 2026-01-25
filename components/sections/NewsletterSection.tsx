'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';
import WaveDivider from '../ui/WaveDivider';

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
    } catch (error: any) {
      setFormState('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <section className="relative bg-[#FEF7E0] text-[#052013]">
      <WaveDivider variant="forest-to-cream" />
      <div className="container mx-auto max-w-4xl py-12 md:py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-wider">
            Restez branchés
          </h2>
          <p className="font-body mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Inscrivez-vous pour connaître la programmation et l&apos;ouverture de la billetterie en avant-première.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          {formState === 'success' ? (
            <div className="flex flex-col items-center justify-center p-8 bg-white/20 rounded-lg">
              <CheckCircle2 className="w-16 h-16 text-[#00A651]" />
              <p className="font-display mt-4 text-2xl font-bold">Merci ! Vous êtes inscrit.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email..."
                className="flex-grow px-6 py-4 rounded-full bg-[#0a3f25] text-[#FEF7E0] placeholder:text-[#FEF7E0]/70 border-none focus:ring-2 focus:ring-[#00A651] outline-none transition-shadow h-12"
                disabled={formState === 'loading'}
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-full bg-[#0a3f25] text-[#FEF7E0] font-bold uppercase tracking-widest hover:bg-[#00A651] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center h-12"
                disabled={formState === 'loading'}
              >
                {formState === 'loading' ? (
                  <Loader2 className="animate-spin w-6 h-6" />
                ) : (
                  "S'inscrire"
                )}
              </button>
            </form>
          )}
          {formState === 'error' && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
