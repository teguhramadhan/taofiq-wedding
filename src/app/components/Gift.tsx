"use client";

import { useState } from "react";
import {
  FiCopy,
  FiCheck,
  FiCreditCard,
  FiSmartphone,
  FiX,
  FiGift,
  FiMapPin,
} from "react-icons/fi";
import { RiQrCodeLine } from "react-icons/ri";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const GiftSection = () => {
  const [copiedText, setCopiedText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Safe vibration with fallback
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      setCopiedText(type);
      setTimeout(() => setCopiedText(""), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopiedText(type);
        setTimeout(() => setCopiedText(""), 2000);
      } catch (fallbackErr) {
        console.error("Fallback copy failed: ", fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const bankAccounts = [
    {
      bank: "BCA",
      accountNumber: "1234567890",
      accountName: "John Doe",
      logo: "/images/ic/bca-logo.png",
    },
    {
      bank: "Mandiri",
      accountNumber: "1470-0098-7654",
      accountName: "John Doe",
      logo: "/images/ic/mandiri-logo.png",
    },
  ];

  const ewallets = [
    {
      type: "GoPay",
      number: "081234567890",
      name: "John Doe",
      logo: "/images/ic/gopay-logo.png",
    },
    {
      type: "OVO",
      number: "081234567890",
      name: "John Doe",
      logo: "/images/ic/ovo-logo.png",
    },
  ];

  const address = {
    street: "Jl. Mawar No. 123",
    area: "RT 01/RW 05, Kelurahan Bunga",
    city: "Jakarta Selatan 12345",
    province: "DKI Jakarta",
  };

  // Handle escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="relative z-10">
      <div className="flex justify-center items-center bg-black text-white py-16 px-4 font-inter min-h-screen">
        <div className="max-w-full mx-auto">
          <div className="text-center mb-2">
            <h2 className="text-4xl lg:text-6xl font-light mb-4 font-cinzel text-orange-400">
              Wedding Gift
            </h2>
            <p className="text-white/70 lg:max-w-3xl mx-auto text-xs lg:text-lg mb-8">
              Thank you for your presence and prayers. May it be a blessing for
              us both. Your prayers and blessings are a truly meaningful gift to
              us. However, if giving is an expression of love, you can give a
              gift through various payment methods below.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="relative py-4 px-8 border border-orange-400 text-sm md:text-base lg:text-lg font-medium text-orange-400 hover:text-white overflow-hidden transition-all duration-300 before:content-[''] before:absolute before:inset-0 before:w-0 before:bg-orange-400 before:transition-all before:duration-500 before:ease-out hover:before:w-full"
              aria-label="Open gift information modal"
            >
              <span className="relative flex justify-center items-center gap-2 z-10 font-cinzel">
                <FiGift className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
                Open Gift Info
              </span>
            </button>
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              aria-modal="true"
              role="dialog"
              aria-labelledby="gift-modal-title"
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              onKeyDown={handleKeyDown}
              tabIndex={-1}
            >
              <motion.div
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 30, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="bg-black/20 backdrop-blur-sm border border-white/20 max-w-6xl w-full max-h-[90vh] overflow-y-auto my-12 rounded-lg"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/20">
                  <h3
                    id="gift-modal-title"
                    className="text-2xl font-semibold text-orange-400 font-cinzelDecorative"
                  >
                    Gift Information
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                    aria-label="Close modal"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Transfer Bank */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <FiCreditCard className="w-6 h-6 text-orange-400" />
                        <h4 className="text-xl font-semibold">Transfer Bank</h4>
                      </div>

                      <div className="space-y-6">
                        {bankAccounts.map((account, index) => (
                          <div
                            key={index}
                            className="bg-neutral-800 p-6 border border-white/10 rounded-lg"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                                <Image
                                  src={account.logo}
                                  alt={`${account.bank} logo`}
                                  width={64}
                                  height={64}
                                  className="w-12 h-12 object-contain"
                                />
                              </div>
                              <h5 className="text-lg font-bold text-orange-400">
                                {account.bank}
                              </h5>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-gray-400 mb-1">
                                  Nomor Rekening
                                </p>
                                <div className="flex items-center justify-between bg-neutral-700 p-3 rounded">
                                  <span className="font-mono text-sm">
                                    {account.accountNumber}
                                  </span>
                                  <button
                                    onClick={() =>
                                      copyToClipboard(
                                        account.accountNumber,
                                        `${account.bank}-number`
                                      )
                                    }
                                    className="text-orange-400 hover:text-orange-300 transition-colors p-1 rounded"
                                    aria-label={`Copy ${account.bank} account number`}
                                  >
                                    {copiedText === `${account.bank}-number` ? (
                                      <FiCheck className="w-4 h-4" />
                                    ) : (
                                      <FiCopy className="w-4 h-4" />
                                    )}
                                  </button>
                                </div>
                              </div>

                              <div>
                                <p className="text-sm text-gray-400 mb-1">
                                  Atas Nama
                                </p>
                                <div className="flex items-center justify-between bg-neutral-700 p-3 rounded">
                                  <span className="text-sm">
                                    {account.accountName}
                                  </span>
                                  <button
                                    onClick={() =>
                                      copyToClipboard(
                                        account.accountName,
                                        `${account.bank}-name`
                                      )
                                    }
                                    className="text-orange-400 hover:text-orange-300 transition-colors p-1 rounded"
                                    aria-label={`Copy ${account.bank} account name`}
                                  >
                                    {copiedText === `${account.bank}-name` ? (
                                      <FiCheck className="w-4 h-4" />
                                    ) : (
                                      <FiCopy className="w-4 h-4" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* E-Wallet */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <FiSmartphone className="w-6 h-6 text-orange-400" />
                        <h4 className="text-xl font-semibold">E-Wallet</h4>
                      </div>

                      <div className="space-y-6">
                        {ewallets.map((ewallet, index) => (
                          <div
                            key={index}
                            className="bg-neutral-800 p-6 border border-white/10 rounded-lg"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                                <Image
                                  src={ewallet.logo}
                                  alt={`${ewallet.type} logo`}
                                  width={64}
                                  height={64}
                                  className="w-12 h-12 object-contain"
                                />
                              </div>
                              <h5 className="text-lg font-bold text-orange-400">
                                {ewallet.type}
                              </h5>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-gray-400 mb-1">
                                  Nomor
                                </p>
                                <div className="flex items-center justify-between bg-neutral-700 p-3 rounded">
                                  <span className="font-mono text-sm">
                                    {ewallet.number}
                                  </span>
                                  <button
                                    onClick={() =>
                                      copyToClipboard(
                                        ewallet.number,
                                        `${ewallet.type}-number`
                                      )
                                    }
                                    className="text-orange-400 hover:text-orange-300 transition-colors p-1 rounded"
                                    aria-label={`Copy ${ewallet.type} number`}
                                  >
                                    {copiedText === `${ewallet.type}-number` ? (
                                      <FiCheck className="w-4 h-4" />
                                    ) : (
                                      <FiCopy className="w-4 h-4" />
                                    )}
                                  </button>
                                </div>
                              </div>

                              <div>
                                <p className="text-sm text-gray-400 mb-1">
                                  Atas Nama
                                </p>
                                <div className="flex items-center justify-between bg-neutral-700 p-3 rounded">
                                  <span className="text-sm">
                                    {ewallet.name}
                                  </span>
                                  <button
                                    onClick={() =>
                                      copyToClipboard(
                                        ewallet.name,
                                        `${ewallet.type}-name`
                                      )
                                    }
                                    className="text-orange-400 hover:text-orange-300 transition-colors p-1 rounded"
                                    aria-label={`Copy ${ewallet.type} account name`}
                                  >
                                    {copiedText === `${ewallet.type}-name` ? (
                                      <FiCheck className="w-4 h-4" />
                                    ) : (
                                      <FiCopy className="w-4 h-4" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* QRIS & Address */}
                    <div className="space-y-8">
                      {/* QRIS Section */}
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <RiQrCodeLine className="w-6 h-6 text-orange-400" />
                          <h4 className="text-xl font-semibold">QRIS</h4>
                        </div>

                        <div className="text-center bg-neutral-800 p-6 border border-white/10 rounded-lg">
                          <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                            <Image
                              src="/images/ic/qris.jpg"
                              alt="QRIS QR Code"
                              width={128}
                              height={128}
                              className="w-28 h-28 object-contain rounded"
                            />
                          </div>
                          <p className="text-gray-300 text-sm">
                            Scan QR Code untuk transfer melalui e-wallet atau
                            mobile banking.
                          </p>
                        </div>
                      </div>

                      {/* Address Section */}
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <FiMapPin className="w-6 h-6 text-orange-400" />
                          <h4 className="text-xl font-semibold">
                            Alamat Pengiriman
                          </h4>
                        </div>

                        <div className="bg-neutral-800 p-6 border border-white/10 rounded-lg">
                          <div className="space-y-2 mb-4">
                            <p className="font-semibold text-orange-400">
                              Sarah & James
                            </p>
                            <p className="text-gray-300 text-sm">
                              {address.street}
                            </p>
                            <p className="text-gray-300 text-sm">
                              {address.area}
                            </p>
                            <p className="text-gray-300 text-sm">
                              {address.city}
                            </p>
                            <p className="text-gray-300 text-sm">
                              {address.province}
                            </p>
                          </div>

                          <button
                            onClick={() =>
                              copyToClipboard(
                                `${address.street}, ${address.area}, ${address.city}, ${address.province}`,
                                "address"
                              )
                            }
                            className="w-full bg-orange-400 hover:bg-orange-500 text-black font-semibold py-3 px-4 flex items-center justify-center gap-2 transition-colors rounded"
                            aria-label="Copy complete address"
                          >
                            {copiedText === "address" ? (
                              <>
                                <FiCheck className="w-4 h-4" />
                                Alamat Tersalin
                              </>
                            ) : (
                              <>
                                <FiCopy className="w-4 h-4" />
                                Salin Alamat
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GiftSection;
