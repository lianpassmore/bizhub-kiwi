'use client';

import { Lock, Layout, Check } from 'lucide-react';
import Link from 'next/link';

interface TemplateSelectorProps {
  currentTemplate: string;
  isPro: boolean;
  onSelect: (template: string) => void;
}

const TEMPLATES = [
  { id: 'neon', name: 'Cyber Neon', color: 'bg-night-950', border: 'border-neon-cyan' },
  { id: 'clean', name: 'Modern Clean', color: 'bg-white', border: 'border-gray-200' },
  { id: 'classic', name: 'Trust Classic', color: 'bg-[#1e3a8a]', border: 'border-blue-900' },
  // NEW ONES
  { id: 'industrial', name: 'Tradie Tough', color: 'bg-slate-900', border: 'border-yellow-400' },
  { id: 'elegant', name: 'Elegant Spa', color: 'bg-[#faf9f6]', border: 'border-[#d4af37]' },
  { id: 'bold', name: 'Agency Bold', color: 'bg-black', border: 'border-black' },
];

export default function TemplateSelector({ currentTemplate, isPro, onSelect }: TemplateSelectorProps) {
  return (
    <div className="bg-night-900/50 backdrop-blur border border-white/10 p-6 rounded-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-neon-pink font-bold uppercase tracking-widest text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-neon-pink rounded-full"></span>
          Website Theme
        </h3>
        {!isPro && (
          <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded flex items-center gap-1">
            <Lock className="w-3 h-3" /> Free users use Neon
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => isPro && onSelect(t.id)}
            disabled={!isPro && t.id !== 'neon'}
            className={`relative group rounded-xl overflow-hidden border-2 transition-all duration-300 text-left ${
              currentTemplate === t.id 
                ? 'border-neon-cyan ring-2 ring-neon-cyan/50 scale-[1.02]' 
                : 'border-transparent hover:border-white/20'
            } ${!isPro && t.id !== 'neon' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {/* Visual Preview */}
            <div className={`h-24 w-full ${t.color} flex items-center justify-center relative`}>
               <div className="space-y-2 w-1/2">
                  <div className="h-1 w-full bg-current opacity-20 rounded"></div>
                  <div className="h-1 w-2/3 bg-current opacity-20 rounded"></div>
               </div>
               
               {/* Selected Checkmark */}
               {currentTemplate === t.id && (
                 <div className="absolute top-2 right-2 bg-neon-cyan text-night-950 rounded-full p-1">
                   <Check className="w-3 h-3" />
                 </div>
               )}

               {/* Lock Icon */}
               {!isPro && t.id !== 'neon' && (
                 <div className="absolute inset-0 bg-night-950/80 flex items-center justify-center">
                   <Lock className="w-6 h-6 text-gray-500" />
                 </div>
               )}
            </div>
            
            <div className="bg-night-950 p-3 border-t border-white/5">
              <span className={`text-xs font-bold uppercase ${currentTemplate === t.id ? 'text-neon-cyan' : 'text-gray-400'}`}>
                {t.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {!isPro && (
        <div className="mt-6 text-center">
          <Link href="/subscribe" className="text-xs font-bold text-neon-pink hover:text-white underline decoration-neon-pink underline-offset-4 transition">
            Upgrade to unlock all themes
          </Link>
        </div>
      )}
    </div>
  );
}