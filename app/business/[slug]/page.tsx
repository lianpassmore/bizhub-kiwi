import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

// Import the Design Systems
import NeonTemplate from '@/components/templates/NeonTemplate';
import CleanTemplate from '@/components/templates/CleanTemplate';
import ClassicTemplate from '@/components/templates/ClassicTemplate';
import IndustrialTemplate from '@/components/templates/IndustrialTemplate';
import ElegantTemplate from '@/components/templates/ElegantTemplate';
import BoldTemplate from '@/components/templates/BoldTemplate';

// 1. Fetch Data
async function getBusiness(slug: string) {
  const { data } = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', slug)
    .single();

  return data;
}

export default async function BusinessPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const business = await getBusiness(params.slug);

  if (!business) return notFound();

  // 2. Apply Tier Logic (The "Freemium" Rules)
  const isPro = business.subscription_tier === 'pro';

  // Rule A: Only Pro users get the Gallery
  const gallery = isPro && Array.isArray(business.gallery_urls) ? business.gallery_urls : [];
  
  // Rule B: Only Pro users get Clickable Social Links
  const socialLinks = isPro && business.social_links ? business.social_links : {};

  // Rule C: Only Pro users get YouTube Embeds
  const youtubeUrl = isPro ? business.youtube_url : null;

  // Rule D: Only Pro users can switch templates. Free users get Neon.
  const template = isPro ? (business.template || 'neon') : 'neon';

  // 3. Render the Chosen Design
  switch (template) {
    case 'clean':
      return <CleanTemplate business={business} gallery={gallery} socialLinks={socialLinks} youtubeUrl={youtubeUrl} />;
    
    case 'classic':
      return <ClassicTemplate business={business} gallery={gallery} socialLinks={socialLinks} youtubeUrl={youtubeUrl} />;
    
    case 'industrial':
      return <IndustrialTemplate business={business} gallery={gallery} socialLinks={socialLinks} youtubeUrl={youtubeUrl} />;
    
    case 'elegant':
      return <ElegantTemplate business={business} gallery={gallery} socialLinks={socialLinks} youtubeUrl={youtubeUrl} />;
      
    case 'bold':
      return <BoldTemplate business={business} gallery={gallery} socialLinks={socialLinks} youtubeUrl={youtubeUrl} />;

    case 'neon':
    default:
      // We pass 'isPro' to Neon so it knows whether to show the "Verified" badge and Sticky Bar
      return <NeonTemplate business={business} gallery={gallery} socialLinks={socialLinks} youtubeUrl={youtubeUrl} isPro={isPro} />;
  }
}