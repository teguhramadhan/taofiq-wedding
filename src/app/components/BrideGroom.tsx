import { BsInstagram } from "react-icons/bs";
import { motion } from "framer-motion";
import Image from "next/image";

const couple = [
  {
    role: "Groom",
    name: "Taofiq",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    instagram: "taofiq_groom",
    reverse: false,
  },
  {
    role: "Bride",
    name: "Ceweknya",
    avatar:
      "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    instagram: "ceweknya_bride",
    reverse: true,
  },
];

export default function BrideGroom() {
  return (
    <>
      <section className="relative min-h-screen bg-black text-white flex items-center justify-center py-20 px-4 overflow-hidden font-inter">
        <div className="max-w-6xl w-full text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ amount: 0.2 }}
            className="text-4xl lg:text-6xl font-light mb-12 md:mb-24 font-cinzelDecorative"
          >
            The Bride & Groom
          </motion.h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-12 relative">
            {/* Groom */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ amount: 0.2 }}
              className={`flex ${
                couple[0].reverse ? "flex-col-reverse" : "flex-col"
              } items-center text-center space-y-4 ${
                couple[0].reverse ? "space-y-reverse" : ""
              }`}
            >
              <div className="relative w-48 h-72 md:w-64 lg:h-96 mb-12">
                <Image
                  src={couple[0].avatar}
                  alt={`${couple[0].name} Avatar`}
                  width={400} // ganti sesuai kebutuhan real size
                  height={400} // ganti sesuai kebutuhan real size
                  className="w-full h-full rounded-bl-full rounded-full object-cover"
                  style={{
                    boxShadow: "inset 0 0 0 8px #f97316",
                  }}
                  priority
                />
              </div>
              <h3 className="text-2xl font-semibold font-cinzelDecorative">
                {couple[0].name}
              </h3>
              <p className="text-orange-400 uppercase tracking-wide">
                {couple[0].role}
              </p>
              <a
                href={`https://instagram.com/${couple[0].instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition"
              >
                <BsInstagram className="w-5 h-5" />@{couple[0].instagram}
              </a>
            </motion.div>

            {/* AND symbol */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ amount: 0.2 }}
              className="relative z-20 text-7xl md:text-[12vw] text-orange-400 font-cinzelDecorative"
            >
              &
            </motion.div>

            {/* Bride */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ amount: 0.2 }}
              className={`flex ${
                couple[1].reverse ? "flex-col-reverse" : "flex-col"
              } items-center text-center space-y-4 ${
                couple[1].reverse ? "space-y-reverse" : ""
              }`}
            >
              <div className="relative w-48 h-72 md:w-64 lg:h-96 mt-12">
                <Image
                  src={couple[1].avatar}
                  alt={`${couple[1].name} Avatar`}
                  width={400} // atau ukuran aslinya
                  height={400} // atau ukuran aslinya
                  className="w-full h-full rounded-bl-full rounded-full object-cover"
                  style={{
                    boxShadow: "inset 0 0 0 8px #f97316",
                  }}
                  priority
                />
              </div>
              <h3 className="text-2xl font-semibold font-cinzelDecorative">
                {couple[1].name}
              </h3>
              <p className="text-orange-400 uppercase tracking-wide">
                {couple[1].role}
              </p>
              <a
                href={`https://instagram.com/${couple[1].instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition"
              >
                <BsInstagram className="w-5 h-5" />@{couple[1].instagram}
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
