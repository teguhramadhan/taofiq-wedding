"use client";

import { motion } from "framer-motion";

type Guest = {
  fullName: string;
  address: string;
};

type GreetingProps = {
  guest: Guest;
};

export default function Greeting({ guest }: GreetingProps) {
  return (
    <motion.section
      className="flex min-h-screen items-center justify-center bg-black text-white px-6 bg-pattern font-inter pt-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        className="max-w-full lg:max-w-4xl text-center z-10"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      >
        {/* Salam hangat */}
        <motion.h2
          className="lg:text-xl text-white/70 font-light mb-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Salam hangat kepada
        </motion.h2>

        <motion.p
          className="lg:text-2xl mb-1 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Bpk/ibu
        </motion.p>

        <motion.h1
          className="text-2xl font-semibold mb-3 lg:mb-6 font-cinzelDecorative text-orange-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {guest.fullName}
        </motion.h1>

        <motion.p
          className="text-xs md:text-md lg:text-lg px-2 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Kami mengucapkan terima kasih atas perhatian dan berharap kehadiran
          serta waktu berharga Anda di acara kami.
        </motion.p>

        {/* Meaning Section */}
        <motion.div
          className="backdrop-blur-lg bg-white/5 border border-white/20 px-2 py-6 md:px-10 md:py-12 lg:px-12 lg:py-16 animate-fade-in-slower mt-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.h3
            className="text-md md:text-2xl font-medium text-orange-400 mb-6 font-cinzelDecorative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            Allah&apos;s Blessing Message
          </motion.h3>

          {/* Arabic Text */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.4, duration: 0.6 }}
          >
            <p
              className="text-2xl md:text-3xl text-white/90 font-arabic mb-0 md:mb-4"
              dir="rtl"
            >
              يَتَفَكَّرُون
            </p>
          </motion.div>

          <motion.div
            className="text-center mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 0.6 }}
          >
            <h4 className="text-lg font-light text-orange-400 mb-0 md:mb-4">
              Meaning :
            </h4>
          </motion.div>

          <motion.blockquote
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.8 }}
          >
            <p className="text-white/70 text-xs md:text-lg leading-relaxed italic mb-6 max-w-full px-2 mx-auto">
              &quot;And among the signs of His power is that He created for you
              wives of your own kind, so that you would be inclined and feel at
              ease with them, and He made among you a feeling of love and
              affection. Indeed, in that there are truly signs for a person who
              thinks.&quot;
            </p>

            <footer className="text-orange-400 font-medium font-cinzelDecorative">
              (QS. Ar-Rum: 21)
            </footer>
          </motion.blockquote>
        </motion.div>
        {/* Decorative Bottom Element */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-4 animate-fade-in-slowest">
            <motion.div
              className="w-12 h-px bg-gradient-to-r from-transparent to-orange-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            />
            <motion.div
              className="w-3 h-3 border border-orange-400 transform rotate-45"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.7, duration: 0.4 }}
            />
            <motion.div
              className="w-12 h-px bg-gradient-to-l from-transparent to-orange-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
