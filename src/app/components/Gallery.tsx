"use client";

import { BsCameraReels } from "react-icons/bs";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function Gallery() {
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop",
      alt: "Engagement photo 1",
      width: 800,
      height: 1200,
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=900&fit=crop",
      alt: "Engagement photo 2",
      width: 800,
      height: 900,
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=700&fit=crop",
      alt: "Couple photo 1",
      width: 800,
      height: 700,
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1170&auto=format&fit=crop",
      alt: "Couple photo 2",
      width: 1170,
      height: 780,
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1200&fit=crop",
      alt: "Wedding preparation",
      width: 800,
      height: 1200,
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&h=800&fit=crop",
      alt: "Together moment",
      width: 800,
      height: 800,
    },
  ];

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // InView Control
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className="relative md:pt-12 lg:pt-24 font-inter z-10 bg-black"
    >
      <div className="max-w-full mx-auto">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <BsCameraReels className="w-12 h-12 mx-auto text-orange-400 mb-8" />
          <h2 className="text-2xl md:text-5xl font-light font-cinzelDecorative text-orange-400">
            Our Captured Moment
          </h2>
          <p className="text-gray-400 text-xs md:text-lg mt-1 md:mt-4">
            Moments we&apos;ve shared together
          </p>
        </motion.div>

        {/* Grid responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.6 }}
              className="w-full overflow-hidden bg-gray-800 cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full h-auto md:h-[600px] object-cover transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl max-h-full"
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={selectedImage.width}
              height={selectedImage.height}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-all"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
}
