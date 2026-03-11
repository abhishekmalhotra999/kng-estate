import { useRef } from "react";
import { Mail, Phone } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  index: number;
  delay?: number;
}

const TeamCard = ({ name, role, bio, image, index, delay = 0 }: TeamCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 88%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );
    },
    { scope: cardRef }
  );

  const number = String(index + 1).padStart(2, "0");

  return (
    <div
      ref={cardRef}
      className="group relative bg-[#0f0f0f] border border-black/[0.05] overflow-hidden hover:border-[#c9a96e]/20 transition-all duration-700"
    >
      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden relative">
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-500 z-10" />
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Number watermark */}
        <span className="absolute top-4 right-5 font-heading text-5xl font-light text-gray-900/10 group-hover:text-[#c9a96e]/20 transition-colors duration-500 select-none">
          {number}
        </span>

        {/* Social overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 flex justify-center gap-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-16">
          <button className="h-10 w-10 flex items-center justify-center border border-black/10 text-gray-900 hover:bg-[#c9a96e] hover:border-[#c9a96e] transition-all duration-300">
            <Mail size={15} />
          </button>
          <button className="h-10 w-10 flex items-center justify-center border border-black/10 text-gray-900 hover:bg-[#c9a96e] hover:border-[#c9a96e] transition-all duration-300">
            <Phone size={15} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-6 h-[1px] bg-[#c9a96e]/40" />
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#c9a96e]/90">
            {role}
          </span>
        </div>
        <h3 className="text-xl font-heading font-medium text-gray-900 mb-3 group-hover:text-[#c9a96e] transition-colors duration-500">
          {name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed font-light">
          {bio}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
