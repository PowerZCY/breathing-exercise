'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import confetti from 'canvas-confetti'
import { useTranslations } from 'next-intl';
import { Volume2, VolumeX } from 'lucide-react';

export default function BreathingExercise() {
  const [breathCount, setBreathCount] = useState('5')
  const [isExercising, setIsExercising] = useState(false)
  const [currentBreath, setCurrentBreath] = useState(0)
  const [animationState, setAnimationState] = useState('')
  const [timer, setTimer] = useState(0)
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const inhaleAudioRef = useRef<HTMLAudioElement | null>(null);
  const exhaleAudioRef = useRef<HTMLAudioElement | null>(null);

  const INHALE_DURATION = 4
  const EXHALE_DURATION = 8

  // 初始化音频
  useEffect(() => {
    inhaleAudioRef.current = new Audio('/diaomao-4.WAV');
    exhaleAudioRef.current = new Audio('/diaomao-8.WAV');

    return () => {
      if (inhaleAudioRef.current) {
        inhaleAudioRef.current.pause();
        inhaleAudioRef.current = null;
      }
      if (exhaleAudioRef.current) {
        exhaleAudioRef.current.pause();
        exhaleAudioRef.current = null;
      }
    };
  }, []);

  // 播放音效
  const playSound = (isInhale: boolean = true) => {
    if (isMuted) return;
    
    const audioRef = isInhale ? inhaleAudioRef.current : exhaleAudioRef.current;
    if (audioRef) {
      // 重置音频以便重新播放
      audioRef.currentTime = 0;
      audioRef.play().catch(e => console.error("音频播放失败:", e));
    }
  };

  // 停止所有音频播放
  const stopAllSounds = () => {
    if (inhaleAudioRef.current) {
      inhaleAudioRef.current.pause();
      inhaleAudioRef.current.currentTime = 0;
    }
    if (exhaleAudioRef.current) {
      exhaleAudioRef.current.pause();
      exhaleAudioRef.current.currentTime = 0;
    }
  };

  // 切换静音状态
  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // 如果切换到静音状态，立即停止所有音频播放
    if (newMutedState) {
      stopAllSounds();
    }
  };

  useEffect(() => {
    let animationTimer: NodeJS.Timeout
    let countdownTimer: NodeJS.Timeout

    if (isExercising) {
      if (currentBreath >= parseInt(breathCount)) {
        endExercise()
      } else {
        // 在状态改变时播放音效
        if (animationState) {
          playSound(animationState === 'inhale');
        }

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
    // 开始时播放音效
    playSound();
  }

  const resetExercise = () => {
    setIsExercising(false)
    setCurrentBreath(0)
    setAnimationState('')
    setTimer(0)
    // 重置时停止所有音频播放
    stopAllSounds();
  }

  const endExercise = () => {
    setIsExercising(false)
    setAnimationState('')
    setTimer(0)
    setShowCompletionDialog(true)
    // 结束时停止所有音频播放
    stopAllSounds();

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

  const t = useTranslations('mainPanel');
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="w-8"></div> {/* 添加占位元素保持平衡 */}
          <h1 className="text-2xl font-bold">{t('title')}</h1>
          <button
            onClick={toggleMute}
            className="p-2 text-violet-500 hover:bg-violet-50 rounded-full transition-colors"
            aria-label={isMuted ? "取消静音" : "静音"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>

        <div className="mb-4">
          <p className="mb-2">{t('subTitle')}</p>
          <RadioGroup value={breathCount} onValueChange={setBreathCount} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="5" id="r1" />
              <Label htmlFor="r1">5 {t('unit')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="10" id="r2" />
              <Label htmlFor="r2">10 {t('unit')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="20" id="r3" />
              <Label htmlFor="r3">20 {t('unit')}</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex space-x-2 mb-4">
          <Button
            onClick={startExercise}
            disabled={isExercising}
            className="bg-[#C4B5FD] hover:bg-violet-400 text-white"
          >
            {t('startButton')}
          </Button>
          <Button
            onClick={resetExercise}
            variant="outline"
            className="border-violet-400 text-violet-500 hover:bg-violet-50"
          >
            {t('resetButton')}
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
              <span className="text-gray-600">{t('inhale')}</span>
            ) : animationState === 'exhale' ? (
              <span className="text-gray-600">{t('exhale')}</span>
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
                    ? `${((currentBreath * (INHALE_DURATION + EXHALE_DURATION) +
                      (animationState === 'inhale' ? timer : INHALE_DURATION + timer)) /
                      (parseInt(breathCount) * (INHALE_DURATION + EXHALE_DURATION))) * 100}%`
                    : '0%'
                }}
              ></div>
            </div>
            <div className="text-center mt-2 text-sm text-gray-600">
              {animationState ? (
                `${t('progress')}: ${currentBreath + 1} / ${breathCount} ${t('unit')}`
              ) : (
                `${t('helpMsg')}`
              )}
            </div>
          </div>
        </div>
      </div>

      {showCompletionDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-white/90 backdrop-blur-sm px-4 sm:px-8 py-4 sm:py-6 rounded-xl shadow-lg transform transition-all mx-4">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="text-3xl">🎉</div>
              <h2 className="text-2xl font-bold text-violet-700">
                {t('completedTitle')}
              </h2>
              <p className="text-violet-600">
                {t('completedMsg')}
              </p>
              <div className="text-sm text-violet-500 animate-pulse">
                {t('completedX')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}