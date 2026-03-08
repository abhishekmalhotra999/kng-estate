import { useRef } from "react";
import { Mail, Phone } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  delay?: number;
}

const TeamCard = ({ name, role, bio, image, delay = 0 }: TeamCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(cardRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="bg-white border border-gray-100 overflow-hidden group hover:border-black/10 transition-all duration-500 opacity-0"
    >
      <div className="aspect-[4/5] overflow-hidden relative">
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Social interactions overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 flex justify-center gap-4 bg-gradient-to-t from-black/80 to-transparent">
             <button className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg">
                <Mail size={16} />
              </button>
              <button className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg">
                <Phone size={16} />
              </button>
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-heading font-medium text-black mb-1">{name}</h3>
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">{role}</p>
        <p className="text-sm text-gray-400 leading-relaxed font-light">{bio}</p>
      </div>
    </div>
  );
};

export default TeamCard;
