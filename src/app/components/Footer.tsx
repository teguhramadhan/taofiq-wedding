"use client";

import { BiHeart } from "react-icons/bi";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      aria-label="Wedding Footer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative py-20 bg-fixed bg-center bg-cover text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <div className="relative max-w-3xl mx-auto px-6">
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <Image
            src="/images/ornaments/ornaments-top.png"
            alt="Wedding Ornament"
            width={80}
            height={100}
            className="object-contain drop-shadow-lg"
          />
        </motion.div>

        <motion.p
          className="text-gray-300 mb-6 text-sm md:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Dengan segala kerendahan hati, kami berterima kasih atas doa-doa
          Anda.Kehadiran Anda merupakan suatu kehormatan dan kebahagiaan bagi
          keluarga kami.
        </motion.p>

        <motion.div
          className="flex justify-center items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          <BiHeart className="w-5 h-5 text-orange-400" />
          <p className="text-2xl text-orange-400 font-cinzelDecorative">
            Taofiq & Ceweknya
          </p>
          <BiHeart className="w-5 h-5 text-orange-400" />
        </motion.div>
      </div>
    </motion.footer>
  );
}
