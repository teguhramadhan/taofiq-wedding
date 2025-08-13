"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCopy, FiCheck } from "react-icons/fi";
import Image from "next/image";

export default function GiftSection() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const giftInfo = [
    { label: "Bank Transfer (BCA)", value: "1234567890" },
    { label: "E-Wallet (Dana)", value: "081234567890" },
    {
      label: "Alamat Hadiah",
      value: "Jl. Mawar No. 123, RT 04 / RW 05, Jakarta Selatan, 12345",
    },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section
      className="py-20 bg-black text-center text-white relative"
      style={{
        backgroundColor: "#000000",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='40' viewBox='0 0 50 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23fb923c' fill-opacity='0.08'%3E%3Cpath d='M40 10L36.67 0h-2.11l3.33 10H20l-2.28 6.84L12.11 0H10l6.67 20H10l-2.28 6.84L2.11 10 5.44 0h-2.1L0 10l6.67 20-3.34 10h2.11l2.28-6.84L10 40h20l2.28-6.84L34.56 40h2.1l-3.33-10H40l2.28-6.84L47.89 40H50l-6.67-20L50 0h-2.1l-5.62 16.84L40 10zm1.23 10l-2.28-6.84L34 28h4.56l2.67-8zm-10.67 8l-2-6h-9.12l2 6h9.12zm-12.84-4.84L12.77 38h15.79l2.67-8H20l-2.28-6.84zM18.77 20H30l2.28 6.84L37.23 12H21.44l-2.67 8zm-7.33 2H16l-4.95 14.84L8.77 30l2.67-8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <h2 className="text-4xl font-cinzel mb-4">Wedding Gift</h2>
      <p className="mb-8 text-white/70 max-w-lg mx-auto">
        Terima kasih atas doa dan dukungan Anda. Jika ingin memberikan hadiah,
        kami sangat menghargainya.
      </p>

      <button
        onClick={() => setOpen(true)}
        className="relative px-6 md:px-8 py-3 border font-cinzelDecorative border-orange-500 text-sm md:text-base lg:text-lg font-medium text-orange-400 hover:text-white overflow-hidden transition-all duration-300 before:content-[''] before:absolute before:inset-0 before:w-0 before:bg-orange-500 before:text-white before:transition-all before:duration-500 before:ease-out hover:before:w-full inline-block items-center gap-2 whitespace-nowrap animate-gentle-pulse"
      >
        Open Gift Info
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="bg-black backdrop-blur-xl border border-white/20 p-6 sm:p-8 max-w-lg w-full relative text-white shadow-xl">
                {/* Close Button */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 text-orange-400 hover:text-orange-300"
                >
                  <FiX size={20} />
                </button>

                <h2 className="text-2xl font-cinzelDecorative text-orange-400 mb-6 text-center">
                  Gift Information
                </h2>

                {/* QRIS Section */}
                <div className="px-4 py-8 text-center mb-6 border-b border-white/10">
                  <p className="text-sm text-orange-300 mb-3">QRIS</p>
                  <Image
                    src="/images/ic/qris.jpg"
                    alt="QRIS Code"
                    width={160} // set width dalam px
                    height={160} // set height dalam px
                    className="mx-auto object-contain rounded-lg border border-orange-400/30"
                  />
                  <p className="mt-6 text-xs text-gray-300">
                    Scan kode ini untuk mengirim hadiah via QRIS
                  </p>
                </div>

                {/* List Gift Info */}
                <div className="space-y-4">
                  {giftInfo.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-3 gap-12"
                    >
                      <div className="flex flex-col justify-start text-left gap-4">
                        <p className="text-sm text-white">{item.label}</p>
                        <p className="text-xl font-medium text-orange-400">
                          {item.value}
                        </p>
                        <p className="text-xs text-white/70 uppercase">
                          Atas Nama Taofiq
                        </p>
                      </div>
                      <button
                        onClick={() => handleCopy(item.value)}
                        className="p-2 rounded-full hover:bg-white/10"
                      >
                        {copied === item.value ? (
                          <FiCheck className="text-green-400 w-6 h-6" />
                        ) : (
                          <FiCopy className="text-orange-400 w-6 h-6" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
