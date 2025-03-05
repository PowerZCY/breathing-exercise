'use client'

import { useState, useEffect } from 'react'
import BreathingExercise from './BreathingExercise'
import EmbedButton from './EmbedButton'

export default function ClientBreathingWrapper() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <BreathingExercise />
}