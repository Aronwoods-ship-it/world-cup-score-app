'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="flex items-center gap-3 bg-[#001538] rounded-full px-4 py-2 shadow-lg">
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        loop
        onEnded={() => setIsPlaying(false)}
      />
      
      <button
        onClick={togglePlay}
        className="w-10 h-10 bg-[#cc0000] hover:bg-[#aa0000] rounded-full flex items-center justify-center transition-colors"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-white" fill="white" />
        ) : (
          <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
        )}
      </button>
      
      <div className="flex flex-col">
        <span className="text-white text-xs font-bold">Tour</span>
        <span className="text-white/60 text-[10px]">Macky Gee</span>
      </div>
      
      <button
        onClick={toggleMute}
        className="w-8 h-8 text-white/60 hover:text-white flex items-center justify-center transition-colors"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>
    </div>
  )
}
