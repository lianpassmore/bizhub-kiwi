export default function VideoPlayer({ url }: { url: string | null }) {
  if (!url) return null;

  // Logic to extract Video ID from various YouTube URL formats
  const getVideoId = (link: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = link.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getVideoId(url);

  if (!videoId) return null;

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 relative group">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0"
      ></iframe>
    </div>
  );
}