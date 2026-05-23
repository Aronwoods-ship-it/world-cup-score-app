'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Spotify preview URL for Macky Gee - Tour
  const previewUrl = 'https://p.scdn.co/mp3-preview/4fc71fbd3eb50023d216fe7768ec5e49e6331a39?cid=d8a5ed958d274c2e8ee717e6a4b0971d'

  useEffect(() => {
    // Listen for any click on the page to start audio (browser autoplay policy)
    const handleInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true)
        audioRef.current.play().catch(() => {})
      }
    }

    document.addEventListener('click', handleInteraction, { once: true })
    document.addEventListener('touchstart', handleInteraction, { once: true })

    return () => {
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }
  }, [hasInteracted])

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={previewUrl}
        loop
        preload="auto"
      />
      
      {/* Small mute toggle in corner */}
      <button
        onClick={toggleMute}
        className="fixed bottom-4 right-4 z-50 bg-[#001538] hover:bg-[#002255] text-white p-3 rounded-full shadow-lg transition-all"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </>
  )
}
