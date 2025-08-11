type Guest = {
  fullName: string;
  address: string;
};

type GreetingProps = {
  guest: Guest;
};

export default function Greeting({ guest }: GreetingProps) {
  return (
    <section className="flex items-center justify-center bg-black text-white p-12 bg-pattern z-50">
      <div className="max-w-3xl text-center">
        <h2 className="text-xl font-light mb-4">Salam hangat kepada </h2>
        <p className="text-2xl mb-4">Bpk/ibu</p>
        <h1 className="text-2xl font-semibold mb-6 font-cinzelDecorative text-orange-400">
          {guest.fullName}
        </h1>
        <p className="text-lg text-white/40">
          Kami mengucapkan terima kasih atas kehadiran dan waktu berharga Anda
          di acara kami. Semoga momen ini membawa kebahagiaan dan kenangan indah
          bagi Anda.
        </p>
        {/* Decorative Bottom Element */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center space-x-4 animate-fade-in-slowest">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-orange-400"></div>
            <div className="w-3 h-3 border border-orange-400 transform rotate-45"></div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-orange-400"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
