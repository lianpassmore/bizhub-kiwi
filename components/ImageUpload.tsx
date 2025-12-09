'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  label: string;
  businessName?: string;
}

export default function ImageUpload({ onUpload, label, businessName }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // Generate placeholder logo from business name
  const generatePlaceholder = (name: string): string => {
    const canvas = document.createElement('canvas');
    const size = 400;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (!ctx) return '';

    // Neon gradient background
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#7000FF'); // neon-purple
    gradient.addColorStop(0.5, '#FF0099'); // neon-pink
    gradient.addColorStop(1, '#00F0FF'); // neon-cyan
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Get initials (max 2 characters)
    const initials = name
      .split(' ')
      .map(word => word[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase();

    // Draw text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 180px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials || '?', size / 2, size / 2);

    return canvas.toDataURL('image/png');
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];

      // Check file size (10MB = 10 * 1024 * 1024 bytes)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File size must be less than 10MB');
        setUploading(false);
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 1. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('bizhub-assets')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 2. Get the Public URL
      const { data } = supabase.storage
        .from('bizhub-assets')
        .getPublicUrl(filePath);

      setPreview(data.publicUrl);
      onUpload(data.publicUrl); // Pass URL back to parent form

    } catch (error) {
      alert('Error uploading image!');
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-neon-cyan uppercase tracking-wider">
        {label}
      </label>
      <div className="flex items-center gap-4">
        {preview ? (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-neon-cyan/50 shadow-neon-cyan">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          </div>
        ) : businessName ? (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-neon-purple/50 shadow-neon-purple">
            <img src={generatePlaceholder(businessName)} alt="Generated Logo" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-24 h-24 bg-night-950 border border-dashed border-white/20 rounded-lg flex items-center justify-center text-gray-500">
            <ImageIcon className="w-8 h-8 opacity-50" />
          </div>
        )}

        <div className="flex-1">
          <label className="cursor-pointer bg-night-900 border border-white/10 hover:border-neon-pink text-white px-4 py-2 rounded-lg flex items-center gap-2 w-fit transition group">
            {uploading ? <Loader2 className="animate-spin w-4 h-4" /> : <Upload className="w-4 h-4 group-hover:text-neon-pink" />}
            <span className="text-sm font-medium">{uploading ? 'Uploading...' : 'Choose File'}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-500 mt-2">JPG, PNG or WEBP. Max 10MB.</p>
        </div>
      </div>
    </div>
  );
}
