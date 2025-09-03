import { Link } from "@heroui/react";
import { ExternalLink, Sparkles } from "lucide-react";

export default function DanIcon() {
  return (
    <Link 
      href="https://dan-seng.vercel.app" 
      target="_blank" 
      rel="noopener noreferrer"
      className="group relative inline-flex items-center justify-center"
      aria-label="Visit Dan's Portfolio"
    >
     
      <div className="relative mt-5">
    
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
   
          <span className="text-white font-bold text-xl tracking-tighter">DG.</span>

          <Sparkles 
            size={12} 
            className="absolute -top-1 -right-1 text-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
          />
        </div>
        
        <ExternalLink 
          size={10} 
          className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" 
        />
      </div>
    </Link>
  );
}