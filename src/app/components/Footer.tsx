import React from "react";
import { FiMapPin, FiGift } from "react-icons/fi";
import { RiQrCodeLine } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="bg-black backdrop-blur-xl p-6 sm:p-8 md:p-10 font-inter border-t border-white/10">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        {/* Title */}
        <h3 className="text-orange-400 uppercase tracking-[0.2em] font-light font-cinzel text-sm sm:text-base md:text-lg">
          Terima Kasih
        </h3>

        {/* Info Links */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 sm:gap-8 text-gray-300 text-sm sm:text-base">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-orange-400 transition-colors"
          >
            <FiMapPin className="text-orange-400" />
            <span>Lokasi Acara</span>
          </a>

          <a
            href="#gift"
            className="flex items-center gap-2 hover:text-orange-400 transition-colors"
          >
            <FiGift className="text-orange-400" />
            <span>Kirim Hadiah</span>
          </a>

          <a
            href="#qr"
            className="flex items-center gap-2 hover:text-orange-400 transition-colors"
          >
            <RiQrCodeLine className="text-orange-400" />
            <span>QR Code</span>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 tracking-wide">
          © {new Date().getFullYear()} Taofiq & Partner. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
