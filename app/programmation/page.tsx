
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const PROGRAMMATION_DATA = [
  { id: 1, day: 'samedi', name: 'Artist A', time: '18:00', image: '/placeholder.svg', style: 'Techno Melodic', rotation: -4 },
  { id: 2, day: 'samedi', name: 'Artist B', time: '19:30', image: '/placeholder.svg', style: 'Deep House', rotation: 5 },
  { id: 3, day: 'samedi', name: 'Artist C', time: '21:00', image: '/placeholder.svg', style: 'Electro Swing', rotation: -2 },
  { id: 4, day: 'samedi', name: 'Artist D', time: '22:30', image: '/placeholder.svg', style: 'Progressive House', rotation: 3 },
  { id: 5, day: 'samedi', name: 'Artist E', time: '00:00', image: '/placeholder.svg', style: 'Hard Techno', rotation: -5 },
  { id: 6, day: 'samedi', name: 'Artist F', time: '01:30', image: '/placeholder.svg', style: 'Ambient', rotation: 2 },
  { id: 7, day: 'dimanche', name: 'Artist G', time: '17:00', image: '/placeholder.svg', style: 'Afro House', rotation: 4 },
  { id: 8, day: 'dimanche', name: 'Artist H', time: '18:30', image: '/placeholder.svg', style: 'Minimal Techno', rotation: -3 },
  { id: 9, day: 'dimanche', name: 'Artist I', time: '20:00', image: '/placeholder.svg', style: 'Tech House', rotation: 6 },
  { id: 10, day: 'dimanche', name: 'Artist J', time: '21:30', image: '/placeholder.svg', style: 'Live Electro', rotation: -1 },
  { id: 11, day: 'dimanche', name: 'Artist K', time: '23:00', image: '/placeholder.svg', style: 'Electronica', rotation: 3 },
  { id: 12, day: 'dimanche', name: 'Artist L', time: '00:30', image: '/placeholder.svg', style: 'Acid Techno', rotation: -4 },
];

const DayFilter = ({ selectedDay, setSelectedDay }) => (
  <div className="flex justify-center space-x-4 my-8">
    <button
      onClick={() => setSelectedDay('samedi')}
      className={`px-6 py-2 rounded-full font-bold text-lg transition-colors ${
        selectedDay === 'samedi'
          ? 'bg-[#00A651] text-[#FEF7E0]'
          : 'bg-transparent text-[#FEF7E0] border-2 border-[#FEF7E0]'
      }`}
    >
      SAMEDI
    </button>
    <button
      onClick={() => setSelectedDay('dimanche')}
      className={`px-6 py-2 rounded-full font-bold text-lg transition-colors ${
        selectedDay === 'dimanche'
          ? 'bg-[#00A651] text-[#FEF7E0]'
          : 'bg-transparent text-[#FEF7E0] border-2 border-[#FEF7E0]'
      }`}
    >
      DIMANCHE
    </button>
  </div>
);

const ArtistCard = ({ artist }) => (
  <motion.div
    className="relative group"
    style={{ rotate: artist.rotation }}
    whileHover={{ scale: 1.05, rotate: 0 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div className="bg-[#FEF7E0] p-4 rounded-lg shadow-lg text-center">
      <div className="relative w-full h-48 mb-4">
        <Image src={artist.image} alt={artist.name} layout="fill" className="object-cover rounded-md filter grayscale" />
      </div>
      <h3 className="text-xl font-bold text-[#0a3f25]">{artist.name}</h3>
      <p className="text-lg text-[#00A651] font-semibold">{artist.time}</p>
      <p className="text-sm text-[#0a3f25]/70">{artist.style}</p>
    </div>
  </motion.div>
);

const ConnectingLine = () => {
    const pathVariants = {
        hidden: { pathLength: 0 },
        visible: { 
            pathLength: 1,
            transition: { duration: 2, ease: "easeInOut" }
        }
    };
    return (
      <motion.svg 
        className="absolute top-0 left-0 w-full h-full" 
        preserveAspectRatio="none"
        initial="hidden"
        animate="visible"
      >
        <motion.path
          d="M 50 100 Q 200 150 350 100 T 650 100 T 950 100 M 50 300 Q 200 250 350 300 T 650 300 T 950 300 M 50 500 Q 200 450 350 500 T 650 500 T 950 500"
          fill="none"
          stroke="#FEF7E0"
          strokeWidth="2"
          variants={pathVariants}
        />
      </motion.svg>
    );
};

export default function ProgrammationPage() {
  const [selectedDay, setSelectedDay] = useState('samedi');

  const filteredArtists = PROGRAMMATION_DATA.filter(
    (artist) => artist.day === selectedDay
  );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-[#0a3f25] min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-extrabold text-center text-[#FEF7E0] mb-4" style={{ fontFamily: 'Montserrat Black, sans-serif' }}>
          PROGRAMMATION 2026
        </h1>

        <DayFilter selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

        <div className="relative">
          <ConnectingLine />
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 relative z-10"
            >
              {filteredArtists.map((artist) => (
                <motion.div key={artist.id} variants={itemVariants}>
                  <ArtistCard artist={artist} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
