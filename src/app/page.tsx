"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [successName, setSuccessName] = useState<string | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const slugify = (text: string) =>
    text
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const q = query(
        collection(db, "guests"),
        where("slug", "==", name.trim())
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError("Nama undangan tidak ditemukan.");
      } else {
        setSuccessName(name.trim());
        setLoading(false);

        // Delay 2 detik sebelum redirect
        setTimeout(() => {
          const guestSlug = slugify(name);
          router.push(`/${guestSlug}`);
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Auto close error setelah 3 detik
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="font-inter">
      <div
        className="flex flex-col items-center justify-center min-h-screen p-6 relative bg-cover bg-center bg-no-repeat font-inter"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1675719847698-6c8a924b2a7a?q=80&w=769&auto=format&fit=crop&ixlib=rb-4.1.0')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Card Form */}
        <div className="relative border border-orange-400/20 bg-black/50 backdrop-blur-sm px-6 md:px-12 lg:px-24 py-12 w-full max-w-xl rounded-none z-10 shadow-lg">
          <h1 className="text-xl font-cinzelDecorative text-white mb-6 text-center">
            Masukkan Nama Anda
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/10 border border-orange-400/20 focus:border-orange-400 px-4 py-3 text-white resize-none focus:outline-none transition-colors"
              disabled={!!successName}
            />
            <button
              type="submit"
              disabled={loading || !name.trim() || !!successName}
              className="px-6 py-2 bg-orange-400 text-white hover:bg-orange-600 disabled:opacity-50"
            >
              {loading ? "Mencari..." : "Lanjut"}
            </button>
          </form>
        </div>

        {/* Fullscreen Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              key="error-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-6"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-24 h-24 text-red-700 mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Garis silang pertama */}
                  <motion.line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  {/* Garis silang kedua */}
                  <motion.line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  />
                </motion.svg>

                <p className="text-lg font-medium text-white">{error}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Animation */}
        <AnimatePresence>
          {successName && (
            <motion.div
              key="success-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
                className="w-24 h-24 text-orange-500 mb-6"
              >
                <motion.circle
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 27l7 7 16-16"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </motion.svg>

              <motion.h2
                className="text-2xl font-thin text-white font-inter"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                {successName} Tervalidasi
              </motion.h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
