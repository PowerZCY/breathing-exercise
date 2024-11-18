'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function BreathingExercise() {
  const [breathCount, setBreathCount] = useState('5')
  const [isExercising, setIsExercising] = useState(false)
  const [currentBreath, setCurrentBreath] = useState(0)
  const [animationState, setAnimationState] = useState('')
  const [timer, setTimer] = useState(0)
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)

  const INHALE_DURATION = 4
  const EXHALE_DURATION = 8

  useEffect(() => {
    let animationTimer: NodeJS.Timeout
    let countdownTimer: NodeJS.Timeout

    if (isExercising) {
      if (currentBreath >= parseInt(breathCount)) {
        endExercise()
      } else {
        animationTimer = setTimeout(() => {
          setAnimationState(prev => prev === 'inhale' ? 'exhale' : 'inhale')
          setTimer(0)
          if (animationState === 'exhale') {
            setCurrentBreath(prev => prev + 1)
          }
        }, animationState === 'inhale' ? INHALE_DURATION * 1000 : EXHALE_DURATION * 1000)

        countdownTimer = setInterval(() => {
          setTimer(prev => prev + 1)
        }, 1000)
      }
    }

    return () => {
      clearTimeout(animationTimer)
      clearInterval(countdownTimer)
    }
  }, [isExercising, currentBreath, breathCount, animationState])

  const startExercise = () => {
    setIsExercising(true)
    setCurrentBreath(0)
    setAnimationState('inhale')
    setTimer(0)
  }

  const resetExercise = () => {
    setIsExercising(false)
    setCurrentBreath(0)
    setAnimationState('')
    setTimer(0)
  }

  const endExercise = () => {
    setIsExercising(false)
    setAnimationState('')
    setTimer(0)
    setShowCompletionDialog(true)
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-2 w-full">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Breathing Exercise</h1>
        <div className="mb-4">
          <p className="mb-2">Select the number of breaths:</p>
          <RadioGroup value={breathCount} onValueChange={setBreathCount} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="5" id="r1" />
              <Label htmlFor="r1">5 breaths</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="10" id="r2" />
              <Label htmlFor="r2">10 breaths</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="20" id="r3" />
              <Label htmlFor="r3">20 breaths</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex space-x-2 mb-4">
          <Button onClick={startExercise} disabled={isExercising}>Start</Button>
          <Button onClick={resetExercise} variant="destructive">Reset</Button>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-48 h-48">
            <svg
              viewBox="0 0 100 100"
              className={`w-full h-full transition-all duration-300 ${
                animationState === 'inhale'
                  ? 'scale-150'
                  : animationState === 'exhale'
                  ? 'scale-100'
                  : 'scale-0'
              }`}
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="#3B82F6"
                className="transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
              {animationState && (
                `${timer}s / ${animationState === 'inhale' ? INHALE_DURATION : EXHALE_DURATION}s`
              )}
            </div>
          </div>
          <div className="text-center text-xl font-semibold h-16 flex items-center">
            {animationState === 'inhale' ? 'Inhale, expand your belly' : animationState === 'exhale' ? 'Exhale, contract your belly' : ''}
          </div>
          <div className="w-full">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${(currentBreath / parseInt(breathCount)) * 100}%` }}
              ></div>
            </div>
            <div className="text-center mt-2 text-sm text-gray-600">
              Progress: {currentBreath} / {breathCount} breaths
            </div>
          </div>
        </div>
      </div>
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogDescription>
              You've completed your breathing exercise. Great job on taking a moment for your well-being!
            </DialogDescription>
          </DialogHeader>
          <p>Remember, regular practice can lead to significant improvements in your overall health and stress management.</p>
          <Button onClick={() => setShowCompletionDialog(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}