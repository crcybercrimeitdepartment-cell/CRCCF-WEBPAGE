import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Card = ({ title, subtitle, id, Icon, setHoveredCardId, href }) => {
  return (
    <Link
      to={href || `/contact/${id}`}
      onMouseEnter={() => setHoveredCardId(id)}
      onMouseLeave={() => setHoveredCardId(null)}
      onClick={() => setHoveredCardId(null)}
      // Soft premium hover effect with 3D perspective enabled
      className="group bg-bgCard rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col cursor-pointer perspective-[1000px]"
    >
      {/* --- TOP ROW: Icon Box and Arrow --- */}
      <div className="flex items-start justify-between mb-4">
        {/* ✨ FIX: The "No-Rewind" Spin Wrapper ✨ 
            - duration-0 makes the reverse spin instant (invisible).
            - group-hover:duration-700 makes the forward spin smooth.
        */}
        <div className="transition-transform duration-0 group-hover:duration-700 group-hover:[transform:rotateY(360deg)]">
          {/* Inner wrapper keeps the smooth color transitions intact */}
          <div className="p-3 bg-lightBlue rounded-xl text-primary group-hover:bg-primary-gradient group-hover:text-white transition-colors duration-300 shadow-sm">
            <Icon size={24} />
          </div>
        </div>

        {/* Top Right Arrow */}
        <ArrowUpRight
          size={20}
          className="text-slate-300 group-hover:text-primary transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
        />
      </div>

      {/* --- BOTTOM ROW: Title and Subtitle --- */}
      <div>
        <h3 className="text-lg font-bold text-textHeading group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-textSec mt-1.5 font-medium transition-colors duration-300 group-hover:text-slate-500">
          {subtitle || "Manage module settings"}
        </p>
      </div>
    </Link>
  );
};

export default Card;