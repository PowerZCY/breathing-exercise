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
    return null
  }

  // 判断环境，生产环境使用BreathingExercise，否则使用DevBreathingExercise
  const isProduction = process.env.NODE_ENV === 'production'
  return isProduction ? <BreathingExercise /> : <DevBreathingExercise />
}