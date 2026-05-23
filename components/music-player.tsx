'use client'

export function MusicPlayer() {
  return (
    <div className="w-full max-w-[352px]">
      <iframe
        src="https://open.spotify.com/embed/track/1Mze7crzF9BWo82DiAsmjj?utm_source=generator&theme=0"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-xl"
        title="Macky Gee - Tour"
      />
    </div>
  )
}
