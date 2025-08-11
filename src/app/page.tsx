"use client";

import { useState } from "react";
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
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-inter">
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black relative">
        <h1 className="text-2xl font-inter text-white mb-6">
          Masukkan Nama Undangan Anda
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <input
            type="text"
            placeholder="Nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border border-gray-300 text-slate-800 focus:outline-none focus:border-orange-500"
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

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {/* Fullscreen success animation */}
        <AnimatePresence>
          {successName && (
            <motion.div
              key="success-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
            >
              {/* SVG Centang */}
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

              {/* Teks Nama */}
              <motion.h2
                className="text-2xl font-semibold text-white font-inter"
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
