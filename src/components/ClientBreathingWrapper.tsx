'use client'

import { useState, useEffect } from 'react'
import BreathingExercise from './BreathingExercise'
import DevBreathingExercise from './DevBreathingExercise'
import EmbedButton from './EmbedButton'

export default function ClientBreathingWrapper() {
  const [isMounted, setIsMounted] = useState(false)
  const placeHolderStyle = "w-full flex flex-col items-center gap-3 mb-12 min-h-[600px]"
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    // Placeholder for both BreathingExercise and EmbedButton, maintaining the flex structure
    return (
      <div className={placeHolderStyle}>
        <div className="w-full max-w-md" /> {/* Placeholder for Exercise */}
        <div className="h-10 w-full max-w-md" /> {/* Placeholder for EmbedButton (h-10 is 40px) */}
      </div>
    )
  }

  const ExerciseComponentToRender = process.env.NODE_ENV === 'production' ? BreathingExercise : DevBreathingExercise

  return (
    <div className={placeHolderStyle}>
      <ExerciseComponentToRender />
      <EmbedButton />
    </div>
  )
}