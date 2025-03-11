/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use client'

import { appConfig } from '@/lib/appConfig'
import { X } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Locale = typeof appConfig.i18n.locales[number]

export default function LanguageDetector() {
  const [show, setShow] = useState(false)
  const [detectedLocale, setDetectedLocale] = useState<Locale | null>(null)
  const currentLocale = useLocale()
  const router = useRouter()
  const t = useTranslations('languageDetection')

  useEffect(() => {
    // 获取浏览器语言
    const browserLang = navigator.language.split('-')[0] as Locale
    
    // 检查浏览器语言是否在支持的语言列表中
    if (appConfig.i18n.locales.includes(browserLang) && browserLang !== currentLocale) {
      setDetectedLocale(browserLang)
      setShow(true)

      // 设置10秒后自动关闭
      const timer = setTimeout(() => {
        console.log('[LanguageDetector] Auto closing after 10s timeout')
        setShow(false)
      }, 10000)

      // 清理定时器
      return () => clearTimeout(timer)
    }
  }, [currentLocale])

  const handleLanguageChange = () => {
    if (detectedLocale) {
      // 获取当前路径
      const pathname = window.location.pathname
      // 替换语言部分
      const newPathname = pathname.replace(`/${currentLocale}`, `/${detectedLocale}`)
      // 跳转到新路径
      router.push(newPathname)
      setShow(false)
    }
  }

  if (!detectedLocale || !show) return null

  return (
    <div className="fixed top-16 right-4 z-40 w-[420px]">
      <div className={`shadow-lg rounded-lg transition-all duration-300 ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} 
        bg-gradient-to-r from-purple-100/95 via-white/95 to-purple-100/95 backdrop-blur-sm
        animate-gradient-x`}>
        <div className="relative px-6 py-4 overflow-hidden">
          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('title')}
                </h3>
                <p className="text-base text-gray-600">
                  {t('description')} <span className="text-purple-500 font-semibold">{detectedLocale === 'zh' ? '中文' : 'English'}</span>?
                </p>
              </div>
              <button
                onClick={() => setShow(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShow(false)}
                className="flex-1 px-4 py-2 text-base bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
              >
                {t('close')}
              </button>
              <button
                onClick={handleLanguageChange}
                className="flex-1 px-4 py-2 text-base bg-purple-500 text-white rounded-md hover:bg-purple-600"
              >
                {t('changeAction')}
              </button>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-200/30 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  )
} 