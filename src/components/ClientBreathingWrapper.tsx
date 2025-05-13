'use client'

import { useState, useEffect } from 'react'
import BreathingExercise from './BreathingExercise'
import DevBreathingExercise from './DevBreathingExercise'

export default function ClientBreathingWrapper() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    // Return a placeholder with estimated height to prevent layout shift
    // The actual component is w-full max-w-md.
    // min-h-96 is 24rem (384px), adjust as needed.
    return <div className="min-h-[543px] w-full max-w-md" />;
  }

  // 判断环境，生产环境使用BreathingExercise，否则使用DevBreathingExercise
  const isProduction = process.env.NODE_ENV === 'production'
  return isProduction ? <BreathingExercise /> : <DevBreathingExercise />
}