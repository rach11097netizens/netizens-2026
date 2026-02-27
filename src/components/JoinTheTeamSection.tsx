import { Link } from "react-router-dom";
import { SidePattern } from "./SidePattern";
import { ArrowRight } from "lucide-react";
import teamImage from "../assets/images/about-us-team-image.png";

export function JoinTheTeamSection() {
  return (
    <section className="relative w-full bg-[#FFFAFA] py-16 md:py-24 overflow-hidden">
      <SidePattern invert />

      <div className="max-w-[1320px] mx-auto px-4 relative z-10 flex flex-col items-center gap-10">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="bg-[#0E3572]/5 border border-[#0E3572]/10 flex items-center justify-center px-[18px] py-[8px] rounded-[4px]">
            <span className="font-sans font-bold text-[12px] text-regal-navy tracking-wide">
              Join the team
            </span>
          </div>
          <h2 className="font-headings font-normal text-[28px] md:text-[36px] lg:text-[40px] leading-[1.2] text-carbon-black">
            Build systems that power real businesses.
          </h2>
          <p className="font-sans text-[15px] md:text-base text-charcoal/80 leading-[26px]">
            We&apos;re always looking for engineers, designers, and problem-solvers who value structure, clarity, and impact.
          </p>
          <Link to="/book-call" className="px-8 py-4 bg-button-gradient text-white text-sm rounded-button transition-colors flex items-center justify-center gap-2 font-medium">
            Join the team
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="w-full flex justify-center">
          <img
            src={teamImage}
            alt="Netizens team"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
