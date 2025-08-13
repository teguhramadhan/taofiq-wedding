"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const weddingDate = new Date("2025-12-25T14:00:00");

export default function WeddingDetails() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      const days = Math.max(Math.floor(distance / (1000 * 60 * 60 * 24)), 0);
      const hours = Math.max(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        0
      );
      const minutes = Math.max(
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        0
      );
      const seconds = Math.max(Math.floor((distance % (1000 * 60)) / 1000), 0);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div
      className="flex items-center justify-center p-12 relative overflow-hidden font-inter"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Floating Ornaments */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Petals */}
        <div
          className="absolute top-20 left-10 w-3 h-3 bg-orange-300/40 transform rotate-45 animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-32 right-20 w-2 h-2 bg-orange-400/50 rounded-full animate-pulse"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        ></div>
        <div
          className="absolute top-40 left-1/4 w-1 h-6 bg-orange-200/30 animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        ></div>

        {/* Floating Hearts */}
        <div className="absolute top-16 right-1/3 w-4 h-4 opacity-60 animate-float">
          <div className="text-orange-300/50 text-sm">♥</div>
        </div>
        <div className="absolute bottom-20 left-1/3 w-4 h-4 opacity-40 animate-float-delayed">
          <div className="text-orange-400/40 text-xs">♥</div>
        </div>

        {/* Glowing Particles */}
        <div className="absolute top-1/3 left-16 w-1 h-1 bg-orange-300/60 rounded-full animate-twinkle"></div>
        <div
          className="absolute top-2/3 right-24 w-1 h-1 bg-orange-400/50 rounded-full animate-twinkle"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-orange-200/60 rounded-full animate-twinkle"
          style={{ animationDelay: "3s" }}
        ></div>

        {/* Elegant Lines */}
        <div className="absolute top-24 right-32 w-12 h-px bg-gradient-to-r from-transparent via-orange-300/40 to-transparent animate-slide-right"></div>
        <div className="absolute bottom-32 left-24 w-16 h-px bg-gradient-to-l from-transparent via-orange-400/30 to-transparent animate-slide-left"></div>
      </div>

      <div className="w-full max-w-full mx-auto relative z-10">
        {/* Main Container */}
        <div className="p-2 md:p-12 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <div className="flex items-center justify-center space-x-4 animate-fade-in-slowest mb-12">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-orange-400"></div>
                <div className="w-3 h-3 border border-orange-400 transform rotate-45"></div>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-orange-400"></div>
              </div>
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-light text-white mb-1 font-cinzelDecorative animate-fade-in">
              Save The Date
            </h2>
            <p className="text-xs text-white/80 font-light animate-fade-in-delayed">
              Thursday, November 6th, 2025
            </p>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl md:text-xl lg:text-4xl font-thin mb-4 tracking-wide uppercase text-orange-400 mt-12"
            >
              The Countdown to Forever
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-8"
            >
              {Object.entries(timeLeft).map(([unit, value]) => (
                <motion.div
                  key={unit}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                  className="px-2 py-4 border border-orange-700/30"
                >
                  <div className="lg:text-5xl font-light font-cinzelDecorative text-orange-400 mb-1">
                    {value}
                  </div>
                  <div className="text-gray-500 font-inter font-bold uppercase tracking-widest text-xs">
                    {unit}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <p className="text-white text-sm lg:text-2xl max-w-full lg:max-w-4xl font-thin mx-auto mt-12 animate-fade-in-slow">
              Plataran Menteng, Jalan HOS. Cokroaminoto, RT.6/RW.4, Gondangdia,
              Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta, Indonesia.
            </p>
          </div>

          {/* Map Button */}
          <div className="text-center mt-8">
            <button className="relative px-6 md:px-8 py-3 border border-orange-500 text-sm md:text-base lg:text-lg font-medium text-orange-400 hover:text-white overflow-hidden transition-all duration-300 before:content-[''] before:absolute before:inset-0 before:w-0 before:bg-orange-600 before:transition-all before:duration-500 before:ease-out hover:before:w-full inline-block items-center gap-2 whitespace-nowrap animate-gentle-pulse">
              <span className="relative z-10 uppercase flex items-center gap-2">
                <FaLocationDot className="w-4 h-4 md:w-5 md:h-5" />
                Open Maps
              </span>
            </button>
          </div>
        </div>

        {/* Enhanced Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-orange-200/20 blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-orange-300/15 blur-2xl animate-float-gentle"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-orange-400/10 blur-lg animate-twinkle-slow"></div>
      </div>
    </div>
  );
}
