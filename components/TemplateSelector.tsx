'use client';

import { Lock } from 'lucide-react';
import Link from 'next/link';

interface TemplateSelectorProps {
  currentTemplate: string;
  isPro: boolean;
  onSelect: (template: string) => void;
}

const TEMPLATES = [
  {
    id: 'neon',
    name: 'Neon Pop',
    description: 'Bold and vibrant',
    free: true,
    preview: '/templates/neon-preview.jpg'
  },
  {
    id: 'minimal',
    name: 'Clean Minimal',
    description: 'Simple and professional',
    free: false,
    preview: '/templates/minimal-preview.jpg'
  },
  {
    id: 'classic',
    name: 'Classic Business',
    description: 'Traditional and trustworthy',
    free: false,
    preview: '/templates/classic-preview.jpg'
  }
];

export default function TemplateSelector({ currentTemplate, isPro, onSelect }: TemplateSelectorProps) {
  return (
    <div className="bg-white border-2 border-black p-8 rounded-2xl shadow-sm">
      <h3 className="text-slate-900 font-black uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
        <span className="w-3 h-3 bg-neon-purple border-2 border-black rounded-full"></span>
        Page Template
      </h3>

      <div className="grid md:grid-cols-3 gap-4">
        {TEMPLATES.map((template) => {
          const isLocked = !template.free && !isPro;
          const isSelected = currentTemplate === template.id;

          return (
            <div
              key={template.id}
              onClick={() => !isLocked && onSelect(template.id)}
              className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'border-neon-pink bg-pink-50'
                  : 'border-slate-200 hover:border-black'
              } ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLocked && (
                <div className="absolute top-2 right-2 bg-slate-900 text-white p-1 rounded">
                  <Lock className="w-4 h-4" />
                </div>
              )}

              <div className="aspect-video bg-slate-100 rounded-lg mb-3 flex items-center justify-center text-slate-400 text-sm font-bold">
                {template.name}
              </div>

              <h4 className="font-black text-slate-900 text-sm mb-1">{template.name}</h4>
              <p className="text-xs text-slate-500 font-medium">{template.description}</p>

              {!template.free && (
                <div className="mt-2 text-xs font-black text-neon-purple">PRO</div>
              )}
            </div>
          );
        })}
      </div>

      {!isPro && (
        <div className="mt-6 bg-gradient-to-r from-neon-pink to-purple-600 border-2 border-black rounded-xl p-6 text-white">
          <h4 className="font-black text-lg mb-2">Unlock All Templates</h4>
          <p className="text-sm mb-4 opacity-90">Get access to premium templates with Pro</p>
          <Link
            href="/subscribe"
            className="inline-block bg-white text-slate-900 border-2 border-black px-6 py-2 rounded-lg font-black uppercase tracking-wider shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-hover transition-all"
          >
            Upgrade to Pro
          </Link>
        </div>
      )}
    </div>
  );
}
