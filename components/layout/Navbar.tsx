"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#concept", label: "Le Concept", isAnchor: true },
    { href: "/programmation", label: "Programmation", isAnchor: false },
    { href: "/boutique", label: "Shop", isAnchor: false },
    { href: "/benevoles", label: "Bénévoles", isAnchor: false },
    { href: "/#infos", label: "Infos Pratiques", isAnchor: true },
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string, isAnchor: boolean) => {
    if (isAnchor && pathname === "/") {
      e.preventDefault();
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <motion.div
        initial={false}
        animate={{
          backgroundColor: isScrolled || isMobileMenuOpen ? "rgba(10, 63, 37, 1)" : "rgba(10, 63, 37, 0)",
          boxShadow: isScrolled || isMobileMenuOpen ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "0 0 0px 0px rgba(0, 0, 0, 0)",
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-[-1]"
      />
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 md:gap-3"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              setIsMobileMenuOpen(false);
            }}
          >
            <Image src="/logo.png" alt="The Green Event" width={48} height={48} className="h-10 md:h-12 w-auto border-2 border-cream/20 rounded-full" />
            <span className="font-display font-black text-cream text-sm md:text-lg tracking-tight hidden sm:block">
              THE GREEN EVENT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, link.isAnchor)}
                className="text-cream/80 hover:text-cream font-body font-semibold text-sm uppercase tracking-wider transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-leaf transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cream p-2 focus:outline-none rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
          </button>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
              animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
              exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed inset-0 bg-[#0a3f25] flex flex-col items-center justify-center p-6"
            >
              <div className="flex flex-col gap-8 items-center">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      delay: isMobileMenuOpen ? 0.2 + index * 0.1 : 0,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    <Link
                      href={link.href}
                      className="text-cream font-display font-black text-4xl uppercase tracking-tighter hover:text-leaf transition-colors text-center block"
                      onClick={(e) => handleLinkClick(e, link.href, link.isAnchor)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
