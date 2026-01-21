"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#concept", label: "Le Concept" },
    { href: "#programmation", label: "Programmation" },
    { href: "#infos", label: "Infos Pratiques" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-forest/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 md:gap-3"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Image src="/logo.png" alt="The Green Event" width={48} height={48} className="h-10 md:h-12 w-auto" />
            <span className="font-display font-black text-cream text-sm md:text-lg tracking-tight hidden sm:block">
              THE GREEN EVENT
            </span>
          </a>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-cream/80 hover:text-cream font-body font-semibold text-sm uppercase tracking-wider transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-leaf transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <Button
              asChild
              className="bg-leaf hover:bg-leaf/90 text-cream font-display font-bold uppercase tracking-wide px-6"
            >
              <a href="https://example.com/billetterie" target="_blank" rel="noopener noreferrer">
                Billetterie
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cream p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-forest/98 backdrop-blur-md border-t border-cream/10">
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-cream font-body font-semibold text-lg py-2 text-left hover:text-leaf transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Button
                asChild
                className="bg-leaf hover:bg-leaf/90 text-cream font-display font-bold uppercase tracking-wide mt-2"
              >
                <a href="https://example.com/billetterie" target="_blank" rel="noopener noreferrer">
                  Billetterie
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
