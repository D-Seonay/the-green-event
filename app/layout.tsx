import type { Metadata } from "next";
import { Inter, Montserrat, Nunito } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ClientLayout from "@/components/layout/ClientLayout";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: "The Green Event | Festival Électro & Nature à Vertou",
  description: "Le festival électronique intergénérationnel et éco-responsable au cœur du parc de la Sèvre à Vertou. Musique, nature et partage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={cn(
        "min-h-screen bg-background font-body antialiased",
        inter.variable,
        montserrat.variable,
        nunito.variable
      )}>
        <ClientLayout>
          <Navbar />
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
