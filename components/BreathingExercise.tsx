'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import confetti from 'canvas-confetti'

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
    setTimer(1)
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
    
    // 增加撒花的数量和范围
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 }
    })

    // 弹窗显示时间从3秒改为4秒
    setTimeout(() => {
      setShowCompletionDialog(false)
    }, 4000)
  }

  return (
    <div className="bg-blue-50 flex flex-col items-center justify-center p-2 w-full">
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
          <Button 
            onClick={startExercise} 
            disabled={isExercising}
            className="bg-violet-400 hover:bg-violet-500 text-white"
          >
            Start
          </Button>
          <Button 
            onClick={resetExercise} 
            variant="outline"
            className="border-violet-400 text-violet-500 hover:bg-violet-50"
          >
            Reset
          </Button>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-48 h-48">
            <svg
              viewBox="0 0 100 100"
              style={{
                width: '100%',
                height: '100%',
                transition: animationState === 'inhale' 
                  ? 'transform 4s ease-in-out'
                  : animationState === 'exhale'
                  ? 'transform 8s ease-in-out'
                  : 'none',
                transform: animationState === 'inhale'
                  ? 'scale(1.25)'
                  : animationState === 'exhale'
                  ? 'scale(0.75)'
                  : 'scale(1)'
              }}
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="#C4B5FD"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
              {animationState && (
                `${timer}s / ${animationState === 'inhale' ? INHALE_DURATION : EXHALE_DURATION}s`
              )}
            </div>
          </div>
          <div className="text-center text-xl font-semibold h-16 flex items-center">
            {animationState === 'inhale' ? (
              <span className="text-gray-600">Inhale, expand your belly</span>
            ) : animationState === 'exhale' ? (
              <span className="text-gray-600">Exhale, contract your belly</span>
            ) : (
              ''
            )}
          </div>
          <div className="w-full">
            <div className="w-full bg-violet-50 rounded-full h-2.5">
              <div 
                className="bg-violet-300 h-2.5 rounded-full transition-all duration-1000 ease-in-out" 
                style={{ 
                  width: animationState 
                    ? `${(currentBreath + 1) / parseInt(breathCount) * 100}%` 
                    : '0%'
                }}
              ></div>
            </div>
            <div className="text-center mt-2 text-sm text-gray-600">
              {animationState ? (
                `Progress: ${currentBreath + 1} / ${breathCount} breaths`
              ) : (
                'Press Start to begin'
              )}
            </div>
          </div>
        </div>
      </div>
      
      {showCompletionDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-white/90 backdrop-blur-sm px-8 py-6 rounded-xl shadow-lg transform transition-all">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="text-3xl">🎉</div>
              <h2 className="text-2xl font-bold text-violet-700">
                Great job!
              </h2>
              <p className="text-violet-600">
                You've completed your breathing exercise
              </p>
              <div className="text-sm text-violet-500 animate-pulse">
                Take a moment to notice how you feel
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}