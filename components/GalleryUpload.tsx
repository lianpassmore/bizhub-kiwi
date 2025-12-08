'use client';

import { X, Plus, Image as ImageIcon } from 'lucide-react';
import ImageUpload from './ImageUpload';

interface GalleryUploadProps {
  images: string[];
  onUpdate: (newImages: string[]) => void;
  maxLimit?: number;
}

export default function GalleryUpload({ images = [], onUpdate, maxLimit = 10 }: GalleryUploadProps) {
  
  const handleAdd = (url: string) => {
    if (images.length >= maxLimit) return;
    onUpdate([...images, url]);
  };

  const handleRemove = (indexToRemove: number) => {
    onUpdate(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Gallery Images
        </label>
        <span className={`text-xs font-bold ${images.length >= maxLimit ? 'text-red-500' : 'text-neon-cyan'}`}>
          {images.length} / {maxLimit} Used
        </span>
      </div>

      {/* Grid of Existing Images */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <div key={index} className="relative aspect-square bg-night-950 rounded-xl overflow-hidden group border border-white/10">
            <img src={url} alt="Gallery" className="w-full h-full object-cover" />
            
            {/* Delete Button (Overlay) */}
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg hover:scale-110"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {/* The "Add New" Button */}
        {images.length < maxLimit ? (
          <div className="aspect-square bg-night-900/50 border border-dashed border-white/20 rounded-xl flex items-center justify-center relative hover:border-neon-cyan transition group">
            <div className="absolute inset-0 opacity-0 z-10">
               {/* Reuse our existing single uploader, but hide its UI and just capture the event */}
               <ImageUpload 
                 label="" 
                 onUpload={handleAdd} 
                 // We hack the styling of the child component slightly via CSS or just wrapper logic
                 // But for simplicity, let's just make the ImageUpload component strictly logic-focused 
                 // OR simpler: we just render the ImageUpload normally but style it to fit the grid.
               /> 
            </div>
            
            {/* Visual Placeholder */}
            <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-neon-cyan pointer-events-none">
              <Plus className="w-8 h-8" />
              <span className="text-xs font-bold uppercase">Add Photo</span>
            </div>
          </div>
        ) : (
          // Limit Reached State
          <div className="aspect-square bg-night-950 border border-white/5 rounded-xl flex flex-col items-center justify-center text-gray-600">
            <span className="text-xs font-bold uppercase text-center px-2">Limit Reached</span>
          </div>
        )}
      </div>
    </div>
  );
}