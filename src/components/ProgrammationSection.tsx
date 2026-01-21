import { motion } from "framer-motion";
import WaveDivider from "./WaveDivider";

interface Artist {
  name: string;
  style: string;
  imageUrl: string;
  rotation: number;
  offsetY: number;
}

const artists: Artist[] = [
  {
    name: "LUNA VERDE",
    style: "House Lo-Fi",
    imageUrl: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400&h=500&fit=crop&auto=format",
    rotation: -3,
    offsetY: 0,
  },
  {
    name: "FORÊT NOIRE",
    style: "Techno Minimal",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=500&fit=crop&auto=format",
    rotation: 2,
    offsetY: 40,
  },
  {
    name: "ECHO VERT",
    style: "Deep House",
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=500&fit=crop&auto=format",
    rotation: -2,
    offsetY: -20,
  },
  {
    name: "MYSTIC MOSS",
    style: "Melodic Techno",
    imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=500&fit=crop&auto=format",
    rotation: 3,
    offsetY: 30,
  },
  {
    name: "TERRA BEAT",
    style: "Organic House",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=500&fit=crop&auto=format",
    rotation: -1,
    offsetY: -10,
  },
];

const ArtistCard = ({ artist, index }: { artist: Artist; index: number }) => {
  return (
    <motion.div
      className="relative flex-shrink-0 w-[200px] md:w-[260px] group"
      style={{
        transform: `rotate(${artist.rotation}deg)`,
        marginTop: artist.offsetY,
      }}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
    >
      {/* Organic shape container */}
      <div 
        className="relative overflow-hidden shadow-2xl"
        style={{
          borderRadius: index % 2 === 0 
            ? "60% 40% 50% 50% / 50% 60% 40% 50%" 
            : "40% 60% 50% 50% / 60% 40% 50% 50%",
        }}
      >
        {/* Image with duotone effect */}
        <div className="relative aspect-[4/5]">
          <img
            src={artist.imageUrl}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
          {/* Duotone overlay */}
          <div className="absolute inset-0 bg-forest mix-blend-color opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-forest/90" />
        </div>

        {/* Artist Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <h3 className="font-display font-black text-cream text-lg md:text-xl tracking-tight">
            {artist.name}
          </h3>
          <p className="font-body text-cream/70 text-sm md:text-base uppercase tracking-wider">
            {artist.style}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ProgrammationSection = () => {
  return (
    <section id="programmation" className="relative">
      {/* Wave Transition */}
      <WaveDivider variant="forest-to-cream" className="-mt-1 bg-cream" />

      <div className="bg-forest py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-black text-cream text-4xl md:text-6xl lg:text-7xl mb-4">
              PROGRAMMATION
            </h2>
            <p className="font-body text-cream/70 text-lg md:text-xl">
              Une sélection d'artistes uniques pour des nuits inoubliables
            </p>
          </motion.div>

          {/* The Thread - Wavy connecting line */}
          <div className="relative">
            {/* SVG Thread */}
            <svg
              className="absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 hidden md:block"
              viewBox="0 0 1200 20"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0,10 Q150,0 300,10 T600,10 T900,10 T1200,10"
                fill="none"
                stroke="hsl(var(--cream))"
                strokeWidth="2"
                strokeDasharray="8 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>

            {/* Artist Cards */}
            <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 md:gap-6 lg:gap-8 items-center">
              {artists.map((artist, index) => (
                <ArtistCard key={artist.name} artist={artist} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgrammationSection;
