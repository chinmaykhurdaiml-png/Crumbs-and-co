import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  label: string;
  count: number;
  description: string;
  image: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  label,
  count,
  description,
  image,
}) => {
  return (
    <Link
      to={`/menu?category=${id}`}
      className="group relative overflow-hidden rounded-sm bg-[#39251F] aspect-4/5 block shadow-sm border border-[#39251F]/10 hover:shadow-lg transition-all duration-300"
    >
      {/* Background Image */}
      <img
        src={image}
        alt={label}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 opacity-80 group-hover:opacity-90"
      />

      {/* Dark warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A15] via-[#2A1A15]/40 to-transparent" />

      {/* Card Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-[#FFF5E8]">
        <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#D9A6A0] block mb-1">
            {count} {count === 1 ? 'Creation' : 'Creations'}
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#FFF5E8] leading-tight">
            {label}
          </h3>
          <p className="text-xs text-[#FFF5E8]/80 mt-1.5 line-clamp-2 leading-relaxed">
            {description}
          </p>

          <div className="mt-3.5 flex items-center gap-1.5 text-xs font-semibold text-[#C58B52] group-hover:text-[#FFF5E8] transition-colors">
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};
