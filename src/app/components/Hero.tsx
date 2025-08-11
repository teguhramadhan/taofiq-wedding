"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { GiLinkedRings } from "react-icons/gi";

type Guest = {
  fullName: string;
  address: string;
};

type HeroProps = {
  guest: Guest;
  onViewInvitation: () => void;
};

export default function Hero({ guest, onViewInvitation }: HeroProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isExiting, setIsExiting] = useState(false);

  // Disable scroll saat Hero muncul
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleOpenInvitation = () => {
    console.log("Buka Undangan clicked - starting exit animation");
    setIsExiting(true);

    // Setelah animasi selesai (800ms), panggil onViewInvitation
    setTimeout(() => {
      console.log("Exit animation completed - calling onViewInvitation");
      onViewInvitation();
    }, 800);
  };

  return (
    <motion.main
      className="fixed inset-0 bg-black flex items-center justify-center z-20"
      initial={{ opacity: 0 }}
      animate={isExiting ? { y: "-100%", opacity: 0 } : { opacity: 1, y: 0 }}
      transition={{
        duration: isExiting ? 0.8 : 0.6,
        ease: isExiting ? "easeInOut" : "easeOut",
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1588436199517-f2b12041a7cc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
        aria-hidden="true"
      />
      <div className="bg-black relative z-20 min-h-screen flex flex-col items-center justify-center px-4 py-16 w-full text-center bg-white/5 border border-white/20 shadow-2xl p-10 sm:p-12 font-inter">
        <div ref={ref}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={
              isExiting
                ? { opacity: 0, y: -30 }
                : isInView
                ? { opacity: 1, y: 0 }
                : {}
            }
            transition={{
              delay: isExiting ? 0 : 0.2,
              duration: isExiting ? 0.4 : 0.6,
            }}
            className="mb-10"
          >
            <div className="text-orange-400/60 w-20 h-10 mx-auto mb-6">
              <GiLinkedRings size={64} />
            </div>

            <h1 className="font-cinzel text-3xl md:text-5xl text-white mb-2 uppercase">
              Wedding Invitation
            </h1>
            <p className="font-inter text-sm text-white/60 tracking-widest">
              Sabtu, 30 November 2025
            </p>
            <div className="w-24 h-px bg-orange-400 mx-auto mt-4" />
          </motion.div>

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isExiting
                ? { opacity: 0, y: 30 }
                : isInView
                ? { opacity: 1, y: 0 }
                : {}
            }
            transition={{
              delay: isExiting ? 0.1 : 0.4,
              duration: isExiting ? 0.4 : 0.6,
            }}
            className="mb-10"
          >
            <h2 className="font-inter text-sm tracking-widest text-white/70 mb-3 uppercase">
              Kepada Yth.
            </h2>
            <h3 className="font-italiana text-3xl md:text-4xl text-white mb-4">
              {guest.fullName}
            </h3>
            <h3 className="uppercase mb-6 text-white">Di {guest.address}</h3>
            <p className="font-inter text-white/90 text-base font-thin">
              Dengan penuh sukacita, kami mengundang Anda untuk hadir dalam
              perayaan pernikahan kami:
            </p>

            {/* Nama Mempelai */}
            <div className="mt-6 font-cinzelDecorative text-2xl sm:text-3xl text-orange-300">
              Taofiq <span className="text-white mx-4">&amp;</span> Cewek
            </div>
          </motion.div>

          {/* Dekorasi bawah */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isExiting
                ? { opacity: 0, scale: 0.6 }
                : isInView
                ? { opacity: 1, scale: 1 }
                : {}
            }
            transition={{
              delay: isExiting ? 0.2 : 0.6,
              duration: isExiting ? 0.3 : 0.5,
            }}
            className="flex items-center justify-center space-x-4 text-orange-400/60 mt-12"
          >
            <div className="w-12 h-px bg-current" />
            <div className="text-sm">♥</div>
            <div className="w-12 h-px bg-current" />
          </motion.div>

          {/* Tombol Buka Undangan */}
          <motion.button
            onClick={handleOpenInvitation}
            disabled={isExiting}
            initial={{ opacity: 0, y: 20 }}
            animate={
              isExiting
                ? { opacity: 0, y: 40, scale: 0.9 }
                : isInView
                ? { opacity: 1, y: 0, scale: 1 }
                : {}
            }
            transition={{
              delay: isExiting ? 0.1 : 0.8,
              duration: isExiting ? 0.4 : 0.6,
            }}
            whileHover={!isExiting ? { scale: 1.05 } : {}}
            whileTap={!isExiting ? { scale: 0.95 } : {}}
            className={`mt-12 px-6 py-3 font-semibold transition-all duration-300 ${
              isExiting
                ? "bg-orange-300 text-gray-700 cursor-not-allowed"
                : "bg-orange-400 text-black hover:bg-orange-500 cursor-pointer"
            }`}
          >
            {isExiting ? "Memuat..." : "Buka Undangan"}
          </motion.button>
        </div>
      </div>
    </motion.main>
  );
}
