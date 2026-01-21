import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ParallaxFloatingElement } from "./FloatingElements";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-forest"
    >
      {/* Background Pattern Layer */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_hsl(var(--cream))_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,_hsl(var(--cream))_0%,_transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,_hsl(var(--cream))_0%,_transparent_30%)]" />
      </motion.div>

      {/* Floating Elements - Background (Blurred, slow) */}
      <ParallaxFloatingElement
        variant="leaf"
        size="xl"
        blur
        speed={0.2}
        initialY={-50}
        rotation={15}
        className="top-[10%] left-[5%]"
      />
      <ParallaxFloatingElement
        variant="cube"
        size="lg"
        blur
        speed={0.3}
        initialY={100}
        rotation={-20}
        className="top-[60%] right-[10%]"
      />
      <ParallaxFloatingElement
        variant="circle"
        size="xl"
        blur
        speed={0.15}
        initialY={50}
        rotation={10}
        className="bottom-[20%] left-[15%]"
      />

      {/* Floating Elements - Foreground (Sharp, faster - passes in front of title) */}
      <ParallaxFloatingElement
        variant="cube"
        size="sm"
        speed={1.2}
        initialY={200}
        rotation={45}
        className="top-[30%] left-[20%] z-20"
        style={{ opacity: 0.8 }}
      />
      <ParallaxFloatingElement
        variant="leaf"
        size="md"
        speed={1.5}
        initialY={300}
        rotation={-30}
        className="top-[40%] right-[15%] z-20"
        style={{ opacity: 0.7 }}
      />
      <ParallaxFloatingElement
        variant="cube"
        size="sm"
        speed={1.3}
        initialY={250}
        rotation={60}
        className="top-[60%] left-[30%] z-20"
        style={{ opacity: 0.6 }}
      />
      <ParallaxFloatingElement
        variant="leaf"
        size="sm"
        speed={1.4}
        initialY={350}
        rotation={-45}
        className="top-[25%] right-[25%] z-20"
        style={{ opacity: 0.75 }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-4"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <motion.h1
          className="font-display font-black text-cream text-5xl sm:text-6xl md:text-7xl lg:text-9xl tracking-tight mb-4 md:mb-6 text-shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          THE GREEN
          <br />
          EVENT
        </motion.h1>

        <motion.p
          className="font-body text-cream/80 text-lg md:text-2xl mb-8 md:mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Musique Électronique & Nature à Vertou
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Button
            asChild
            size="lg"
            className="bg-leaf hover:bg-leaf/90 text-cream font-display font-bold uppercase tracking-wide text-lg px-8 py-6 md:px-12 md:py-8 rounded-full shadow-2xl hover:shadow-leaf/30 transition-all duration-300 hover:scale-105"
          >
            <a href="https://example.com/billetterie" target="_blank" rel="noopener noreferrer">
              Billetterie
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-cream/50 rounded-full flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 bg-cream/70 rounded-full mt-2"
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
