"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BiMessageAltCheck } from "react-icons/bi";
import { db } from "@/lib/firebase"; // sesuaikan path
import {
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

interface RSVP {
  id: string;
  fullName: string;
  address?: string;
  isComing?: boolean;
  message: string;
  totalAttendees?: number;
  createdAt?: Timestamp | null;
}

export default function RSVPMessageList() {
  const [rsvpList, setRsvpList] = useState<RSVP[]>([]);

  useEffect(() => {
    const fetchRSVP = async () => {
      try {
        const q = query(collection(db, "rsvp"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const data: RSVP[] = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            fullName: (docData.fullName as string) || "",
            address: docData.address as string | undefined,
            isComing: docData.isComing as boolean | undefined,
            message: (docData.message as string) || "No message provided",
            totalAttendees: docData.totalAttendees as number | undefined,
            createdAt: (docData.createdAt as Timestamp) || null,
          };
        });

        setRsvpList(data);
      } catch (error) {
        console.error("Error fetching RSVP data:", error);
      }
    };

    fetchRSVP();
  }, []);

  return (
    <section className="relative min-h-screen py-20 md:py-28 bg-fixed bg-center bg-cover">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/90"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-orange-400/20 backdrop-blur-sm border border-orange-400/30 mb-4 md:mb-6">
            <BiMessageAltCheck className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-thin text-orange-400 tracking-wide uppercase mb-3 md:mb-4 font-cinzel mt-6">
            Wedding Wishes
          </h2>

          <div className="w-20 sm:w-24 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto mb-4"></div>

          <p className="text-white/60 text-base sm:text-lg">
            Messages from our beloved guests
          </p>
        </motion.div>

        {/* Messages */}
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <div className="w-6 sm:w-8 h-px bg-orange-400/30"></div>
            <h3 className="text-base sm:text-lg md:text-xl text-orange-400 uppercase tracking-[0.2em] font-light font-cinzel">
              Messages ({rsvpList.length})
            </h3>
            <div className="flex-1 h-px bg-orange-400/30"></div>
          </div>

          <div className="max-h-[400px] md:max-h-[500px] overflow-y-auto space-y-4 sm:space-y-6 pr-2 scrollbar-thin scrollbar-thumb-orange-400/50 scrollbar-track-white/10">
            {rsvpList.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6 hover:border-orange-400/30 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                {/* Nama + tanggal desktop */}
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 sm:w-8 h-6 sm:h-8 bg-orange-400/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-orange-400"></div>
                    </div>
                    <h4 className="font-light text-orange-400/70 text-sm sm:text-base md:text-lg tracking-wide">
                      {item.fullName}
                    </h4>
                  </div>
                  {item.createdAt && (
                    <span className="hidden sm:block text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">
                      {item.createdAt.toDate().toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>

                {/* Pesan */}
                <p className="text-gray-100 leading-relaxed text-xs sm:text-base pl-8 sm:pl-11">
                  {item.message}
                </p>

                {/* Tanggal versi mobile */}
                {item.createdAt && (
                  <span className="block sm:hidden text-[10px] text-gray-400 uppercase tracking-wider mt-6 pl-8">
                    {item.createdAt.toDate().toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
