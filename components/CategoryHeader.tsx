import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface CategoryHeaderProps {
  title: string;
  onBack: () => void;
  bgImage?: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title, onBack, bgImage }) => {
  return (
    <div className="rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden transition-all duration-500 flex flex-col justify-end min-h-[180px]">
        {bgImage && (
           <img src={bgImage} className="absolute inset-0 w-full h-full object-cover" alt={title} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
        
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
             <button onClick={onBack} className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition-colors">
                <ArrowLeft className="w-5 h-5" />
             </button>
             <span className="text-[9px] font-black bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full uppercase tracking-widest border border-white/15">
              Geral
            </span>
          </div>
          
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-black uppercase leading-none mb-1 tracking-tight">
              {title}
            </h2>
          </div>
        </div>
    </div>
  );
};

export default CategoryHeader;
