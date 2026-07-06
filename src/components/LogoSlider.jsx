export default function LogoSlider({ logos }) {
  const loopLogos = [...logos, ...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden">

      {/* LEFT FADE */}
      <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-10" />

      {/* RIGHT FADE */}
      <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-10" />

      {/* TRACK */}
      <div className="flex w-max animate-marquee">

        {loopLogos.map((logo, i) => (
          <div key={i} className="flex items-center justify-center mx-10">
            <img loading="lazy" decoding="async"
              src={logo}
              alt="logo"
              className="
                h-10 object-contain
                grayscale opacity-70
                hover:grayscale-0 hover:opacity-100 hover:scale-110
                transition duration-300
              "
            />
          </div>
        ))}

      </div>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }

          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
        `}
      </style>
    </div>
  );
}
