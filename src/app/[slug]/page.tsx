"use client";

import { useEffect, useState, useRef } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

import Hero from "../components/Hero";
import RSVP from "../components/RSVP";
import Greeting from "../components/Greeting";
import BrideGroom from "../components/BrideGroom";
import WeddingDetails from "../components/WeddingDetails";
import LoveStory from "../components/LoveStory";
import Gallery from "../components/Gallery";
import RSVPMessageList from "../components/Message";
import GiftSection from "../components/Gift";
import Footer from "../components/Footer";

type Guest = {
  fullName: string;
  address: string;
};

export default function InvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // State kontrol Hero muncul atau tidak
  const [showHero, setShowHero] = useState(true);

  // Scroll ke RSVP setelah Hero hilang
  const rsvpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchGuest() {
      try {
        const resolvedParams = await params;
        const urlSlug = decodeURIComponent(resolvedParams.slug).toLowerCase();

        const allGuestsQuery = query(collection(db, "guests"));
        const allSnapshot = await getDocs(allGuestsQuery);

        let foundGuest = null;

        allSnapshot.forEach((doc) => {
          const guestData = doc.data();
          const guestSlug = guestData.slug
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");

          if (guestSlug === urlSlug) {
            foundGuest = guestData;
          }
        });

        if (foundGuest) {
          setGuest(foundGuest as Guest);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching guest:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchGuest();
  }, [params]);

  // Fungsi untuk sembunyikan Hero dan scroll ke RSVP
  const handleViewInvitation = () => {
    setShowHero(false);
  };

  // Setelah Hero hilang, scroll ke RSVP
  useEffect(() => {
    if (!showHero && rsvpRef.current) {
      rsvpRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showHero]);

  // Disable scroll body saat Hero muncul, enable saat Hero hilang
  useEffect(() => {
    if (showHero) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup ketika component unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [showHero]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-orange-400">
        {/* Dot Bounce */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-orange-300 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
          <div className="w-2 h-2 bg-orange-200 rounded-full animate-bounce [animation-delay:-0.6s]"></div>
        </div>

        {/* Teks tema */}
        <div className="flex flex-col justify-center items-center text-sm lg:text-lg font-cinzelDecorative tracking-wider gap-1">
          <p>Sedang Menyiapkan</p>
          <p>undangan Spesial untuk Kamu</p>
          <p className="text-sm text-white/60 italic font-inter">
            Mohon tunggu sebentar yaa..
          </p>
        </div>
      </div>
    );
  }

  if (notFound || !guest) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Tamu tidak ditemukan
      </div>
    );
  }

  return (
    <>
      {showHero ? (
        <Hero guest={guest} onViewInvitation={handleViewInvitation} />
      ) : (
        <div ref={rsvpRef}>
          <Greeting guest={guest} />
          <BrideGroom />
          <WeddingDetails />
          <LoveStory />
          <Gallery />
          <RSVP guest={guest} />
          <RSVPMessageList />
          <GiftSection />
          <Footer />
        </div>
      )}
    </>
  );
}
