import { Star } from "lucide-react";
import googleLogo from "@/assets/images/icons/google.svg";
import designRushLogo from "@/assets/images/icons/design-rush.svg";
import Image from "next/image";
import Link from "next/link";

function HalfStar() {
  return (
    <span className="relative inline-block h-5 w-5">
      <Star
        className="h-5 w-5 text-white/20"
        strokeWidth={1.5}
        fill="currentColor"
      />
      <span
        className="absolute left-0 top-0 h-5 w-5 overflow-hidden"
        style={{ width: "50%" }}
      >
        <Star
          className="h-5 w-5 fill-amber-400 text-amber-400"
          strokeWidth={1.5}
        />
      </span>
    </span>
  );
}

export function RatingWidget() {
  return (
    <div
      className="rating-widget group relative overflow-hidden rounded-xl px-4 py-3 lg:px-5 lg:py-4 w-full lg:w-fit border border-white/10 transition-all duration-300"
      style={{
        backgroundColor: "#0E3572",
        backgroundImage:
          "radial-gradient(120% 100% at 50% -20%, rgba(2, 11, 131, 0.15) 0%, rgba(255, 255, 255, 0) 100%)",
      }}
    >
      {/* CTA-style noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
        }}
      />

      <div className="relative z-10 flex flex-col gap-2 items-center lg:items-start">
        <div className="flex items-center gap-3">
          <span className="font-headings text-[15px] font-semibold text-white">
            4.5 of 5
          </span>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-amber-400 text-amber-400"
                strokeWidth={1.5}
              />
            ))}
            <HalfStar />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
          <span className="flex items-center gap-1.5 font-sans text-[13px] font-medium text-white/90">
            on
            <Image src={googleLogo} alt="Google" className="h-5 w-auto" />
            &amp;
          </span>
          <Link
            href="https://www.designrush.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center transition-opacity hover:opacity-90"
          >
            <Image
              src={designRushLogo}
              alt="DesignRush"
              className="h-6 w-auto"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
