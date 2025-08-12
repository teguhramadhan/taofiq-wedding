"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

type Guest = {
  fullName: string;
  address: string;
};

type LoveStoryProps = {
  guest: Guest;
};

interface StoryStep {
  title: string;
  description: string;
  image: string;
  alt: string;
}

const storySteps: StoryStep[] = [
  {
    title: "When We First Met",
    description:
      "It all began with a simple hello at a little coffee shop. Two strangers, two cups of coffee, and one question that changed everything.",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=700&auto=format&fit=crop",
    alt: "First Meeting",
  },
  {
    title: "Growing Together",
    description:
      "Days turned into months, laughter turned into memories. We explored new places, dreamed new dreams, and found in each other a home.",
    image:
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=700&auto=format&fit=crop",
    alt: "Building Love",
  },
  {
    title: "The Engagement",
    description:
      "One sunset, one ring, one question. Surrounded by soft whispers of the wind and golden skies, we promised each other forever.",
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=700&auto=format&fit=crop",
    alt: "Engagement",
  },
  {
    title: "Happily Ever After",
    description:
      "On this day, with family and friends, we say i do. A promise to stand side by side, through every sunrise and every storm.",
    image:
      "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?q=80&w=700&auto=format&fit=crop",
    alt: "Wedding Day",
  },
  {
    title: "Forever and Always",
    description:
      "Our greatest adventure begins. May our love grow with every heartbeat, every breath, until we're old and gray, dreaming of eternity.",
    image:
      "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=700&auto=format&fit=crop",
    alt: "Forever",
  },
];

export default function LoveStory({ guest }: LoveStoryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: false });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  useEffect(() => {
    const scrollSpeed = 0.5;

    const animate = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        container.scrollLeft += scrollSpeed;

        const cardWidth = window.innerWidth < 640 ? 300 : 600;
        const gap = 32;
        const totalScrollWidth =
          storySteps.length * (cardWidth + gap) - container.clientWidth;

        if (container.scrollLeft >= totalScrollWidth) {
          container.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = window.innerWidth < 640 ? 300 : 600;
      const gap = 32;
      const scrollPosition = index * (cardWidth + gap);

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
      className="w-full min-h-screen flex flex-col justify-center items-center bg-black font-inter"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 my-6"
      >
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-2 font-italiana text-orange-400 font-cinzelDecorative">
          Our Eternal Love Story
        </h1>
        <p className="text-xs sm:text-xl text-white/40 max-w-xs text-center italic lg:max-w-4xl mx-auto mt-6">
          A timeless journey of hearts intertwined, memories carved into
          forever, and dreams whispered under starlit skies.
        </p>
      </motion.div>

      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto scrollbar-hide z-10"
      >
        <div className="flex justify-center items-center w-full">
          {storySteps.map((step, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8 }}
              className="relative w-[300px] sm:w-[600px] h-[400px] lg:h-[600px] overflow-hidden flex-shrink-0 transition-all duration-500 cursor-pointer"
              onClick={() => scrollToIndex(index)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={step.image}
                  alt={step.alt}
                  className="w-full h-full object-cover object-center"
                  width={700}
                  height={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                  <h2 className="text-2xl md:text-4xl font-bold text-orange-400 mb-2 font-cinzel uppercase">
                    {step.title}
                  </h2>
                  <p className="text-sm md:text-lg text-white max-w-xl mt-4 line-clamp-3">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  );
}
