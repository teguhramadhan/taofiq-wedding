import { useState, useEffect } from "react";
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

  const [submitted, setSubmitted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [loading, setLoading] = useState(false);
  const [docId, setDocId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRSVP() {
      const rsvpRef = collection(db, "rsvp");
      const q = query(rsvpRef, where("fullName", "==", guest.fullName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();

        setDocId(docSnap.id);
        setRsvp({
          isComing: data.isComing,
          totalAttendees: data.totalAttendees || 1,
          message: data.message || "",
        });
        setSubmitted(true);
      }
    }

    fetchRSVP();
  }, [guest.fullName]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setRsvp((prev) => ({
        ...prev,
        isComing: value === "yes" ? true : false,
      }));
    } else if (name === "totalAttendees") {
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

      setSubmitted(true);
      setShowThankYou(true);
    } catch (error) {
      console.error("Gagal submit RSVP:", error);
      alert("Terjadi kesalahan, coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  const closeAlert = () => {
    setShowThankYou(false);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-black px-4 -z-10 overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1439539698758-ba2680ecadb9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
        aria-hidden="true"
      />

      {/* Overlay gelap supaya tulisan mudah dibaca */}
      <div
        className="fixed inset-0 bg-black bg-opacity-70"
        aria-hidden="true"
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-md w-full bg-black bg-opacity-60 p-8 rounded-lg shadow-lg relative z-20"
      >
        <div>
          <label className="block text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1">
            Nama Anda
          </label>
          <input
            type="text"
            name="fullName"
            value={guest.fullName}
            readOnly
            className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white rounded"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1">
            Alamat
          </label>
          <input
            type="text"
            name="address"
            value={guest.address}
            readOnly
            className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white rounded"
          />
        </div>

        <div>
          <p className="block text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1">
            Apakah Anda akan hadir?
          </p>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="isComing"
                value="yes"
                checked={rsvp.isComing === true}
                onChange={handleChange}
                className="cursor-pointer"
                required
                disabled={loading}
              />
              Ya
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="isComing"
                value="no"
                checked={rsvp.isComing === false}
                onChange={handleChange}
                className="cursor-pointer"
                disabled={loading}
              />
              Tidak
            </label>
          </div>
        </div>

        {rsvp.isComing && (
          <div>
            <label className="block text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1">
              Jumlah Tamu yang Hadir
            </label>
            <input
              type="number"
              name="totalAttendees"
              value={rsvp.totalAttendees}
              min={1}
              max={10}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white rounded"
              required
              disabled={loading}
            />
          </div>
        )}

        <div>
          <label className="block text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-1">
            Pesan / Ucapan (Opsional)
          </label>
          <textarea
            name="message"
            value={rsvp.message}
            onChange={handleChange}
            rows={3}
            className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white rounded resize-none"
            placeholder="Tulis pesan atau ucapan selamat..."
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-full font-semibold shadow-lg transition-colors duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-400 hover:bg-orange-600 text-white"
          }`}
        >
          {loading
            ? "Mengirim..."
            : docId
            ? "Update Konfirmasi"
            : "Kirim Konfirmasi"}
        </button>
      </form>

      {/* Alert Thank You overlay */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-orange-400 text-white rounded-lg p-8 max-w-md text-center shadow-lg relative">
            <h2 className="text-3xl font-semibold mb-4">Terima kasih!</h2>
            <p>
              Konfirmasi Anda telah kami terima. Kami sangat menantikan
              kehadiran Anda.
            </p>
            <button
              onClick={closeAlert}
              className="mt-6 px-6 py-3 bg-white text-orange-500 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
