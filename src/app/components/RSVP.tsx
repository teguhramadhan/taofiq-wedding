import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import { FiSend, FiEdit, FiLoader } from "react-icons/fi";

type Guest = {
  fullName: string;
  address: string;
};

type RSVPData = {
  isComing: boolean | null;
  totalAttendees: number;
  message: string;
};

type RSVPProps = {
  guest: Guest;
};

export default function RSVP({ guest }: RSVPProps) {
  const [rsvp, setRsvp] = useState<RSVPData>({
    isComing: null,
    totalAttendees: 1,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [docId, setDocId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const options = [
    { value: "yes", label: "Ya" },
    { value: "no", label: "Tidak" },
  ];

  useEffect(() => {
    async function fetchRSVP() {
      const rsvpRef = collection(db, "rsvp");
      const q = query(rsvpRef, where("fullName", "==", guest.fullName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data() as Omit<RSVPData, never>;
        setDocId(docSnap.id);
        setRsvp({
          isComing: data.isComing ?? null,
          totalAttendees: data.totalAttendees || 1,
          message: data.message || "",
        });
      }
    }

    fetchRSVP();
  }, [guest.fullName]);

  const handleSelect = (value: string) => {
    setRsvp((prev) => ({
      ...prev,
      isComing: value === "yes",
    }));
    setOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "totalAttendees") {
      setRsvp((prev) => ({
        ...prev,
        totalAttendees: Number(value),
      }));
    } else if (name === "message") {
      setRsvp((prev) => ({
        ...prev,
        message: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rsvp.isComing === null) {
      alert("Mohon pilih kehadiran Anda.");
      return;
    }

    if (
      rsvp.isComing &&
      (rsvp.totalAttendees < 1 || rsvp.totalAttendees > 10)
    ) {
      alert("Jumlah tamu harus antara 1 sampai 10.");
      return;
    }

    setLoading(true);

    try {
      const rsvpRef = collection(db, "rsvp");

      if (docId) {
        const docRef = doc(db, "rsvp", docId);
        await updateDoc(docRef, {
          isComing: rsvp.isComing,
          totalAttendees: rsvp.isComing ? rsvp.totalAttendees : 0,
          message: rsvp.message,
          updatedAt: Timestamp.now(),
        });
      } else {
        await addDoc(rsvpRef, {
          fullName: guest.fullName,
          address: guest.address,
          isComing: rsvp.isComing,
          totalAttendees: rsvp.isComing ? rsvp.totalAttendees : 0,
          message: rsvp.message,
          createdAt: Timestamp.now(),
        });
      }

      setShowThankYou(true);
    } catch (error) {
      console.error("Gagal submit RSVP:", error);
      alert("Terjadi kesalahan, coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="relative min-h-screen flex items-center justify-center bg-black px-4 overflow-hidden font-inter"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1439539698758-ba2680ecadb9?q=80&w=1170&auto=format&fit=crop")',
      }}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-70"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col w-full justify-center items-center z-10 space-y-12"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full max-w-2xl bg-black backdrop-blur-md bg-opacity-60 p-8 rounded-lg shadow-lg"
        >
          <div className="flex justify-center items-center">
            <h1 className="text-white font-cinzelDecorative text-6xl">RSVP</h1>
          </div>

          {/* Nama */}
          <div>
            <label className="block text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1">
              Nama Anda
            </label>
            <input
              type="text"
              value={guest.fullName}
              readOnly
              className="w-full bg-white/10 border border-orange-400/20 focus:border-orange-400 px-4 py-3 text-white rounded resize-none focus:outline-none transition-colors"
            />
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1">
              Alamat
            </label>
            <input
              type="text"
              value={guest.address}
              readOnly
              className="w-full bg-white/10 border border-orange-400/20 focus:border-orange-400 px-4 py-3 text-white rounded resize-none focus:outline-none transition-colors"
            />
          </div>

          {/* Kehadiran */}
          <div>
            <label className="block text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1">
              Apakah Anda akan hadir?
            </label>
            <div className="relative">
              <button
                type="button"
                disabled={loading}
                onClick={() => setOpen((o) => !o)}
                className="w-full bg-white/10 border border-orange-400/20 focus:border-orange-400 px-4 py-3 text-white rounded flex justify-between items-center"
              >
                {rsvp.isComing === null
                  ? "Pilih Kehadiran..."
                  : rsvp.isComing
                  ? "Ya"
                  : "Tidak"}
                <svg
                  className="w-5 h-5 opacity-80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {open && (
                <ul className="absolute left-0 mt-1 w-full bg-white/5 backdrop-blur-md rounded shadow-lg overflow-hidden z-50">
                  {options.map((opt) => (
                    <li
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className="px-4 py-2 cursor-pointer text-white hover:bg-orange-400 hover:text-white transition"
                    >
                      {opt.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Jumlah Tamu */}
          {rsvp.isComing && (
            <div>
              <label className="block text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1">
                Jumlah Tamu yang Hadir
              </label>
              <div className="flex items-center bg-white/10 border border-white/20 rounded overflow-hidden w-fit">
                <button
                  type="button"
                  disabled={loading || rsvp.totalAttendees <= 1}
                  onClick={() =>
                    setRsvp((prev) => ({
                      ...prev,
                      totalAttendees: Math.max(1, prev.totalAttendees - 1),
                    }))
                  }
                  className="px-3 py-2 text-white hover:bg-orange-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>

                <input
                  type="number"
                  name="totalAttendees"
                  value={rsvp.totalAttendees}
                  min={1}
                  max={10}
                  readOnly
                  className="w-16 text-center bg-transparent text-white focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  required
                  disabled={loading}
                />

                <button
                  type="button"
                  disabled={loading || rsvp.totalAttendees >= 10}
                  onClick={() =>
                    setRsvp((prev) => ({
                      ...prev,
                      totalAttendees: Math.min(10, prev.totalAttendees + 1),
                    }))
                  }
                  className="px-3 py-2 text-white hover:bg-orange-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Pesan */}
          <div>
            <label className="block text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1">
              Pesan / Ucapan (Opsional)
            </label>
            <textarea
              name="message"
              value={rsvp.message}
              onChange={handleChange}
              rows={3}
              className="w-full bg-white/10 border border-orange-400/20 focus:border-orange-400 px-4 py-3 text-white rounded resize-none focus:outline-none transition-colors"
              placeholder="Tulis pesan atau ucapan selamat..."
              disabled={loading}
            />
          </div>

          {/* Tombol submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-3 font-semibold shadow-lg transition-colors duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-400 hover:bg-orange-600 text-white"
            }`}
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" />
                Mengirim...
              </>
            ) : docId ? (
              <>
                <FiEdit />
                Update Konfirmasi
              </>
            ) : (
              <>
                <FiSend />
                Kirim Konfirmasi
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Alert Thank You */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            key="thankyou"
            className="fixed inset-0 bg-black flex items-center justify-center p-12 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="border border-orange-400/40 backdrop-blur-md text-white rounded-lg p-8 max-w-md text-center shadow-lg relative"
            >
              <h2 className="text-3xl font-semibold mb-4 font-cinzelDecorative text-orange-400">
                Terima kasih!
              </h2>
              <p className="text-sm text-white/60">
                Konfirmasi Anda telah kami terima. Kami sangat menantikan
                kehadiran Anda.
              </p>
              <button
                onClick={() => setShowThankYou(false)}
                className="mt-6 underline text-red-400 font-semibold hover:text-gray-200 transition"
              >
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
