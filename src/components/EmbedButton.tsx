/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription  // 添加这个导入
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { appConfig } from '@/lib/appConfig'
import { Code2 } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

export default function EmbedButton() {
    const [open, setOpen] = useState(false)
    const t = useTranslations('embed')
    const t1 = useTranslations('home')
    const { toast } = useToast()
    const locale = useLocale()

    // 修改 iframe 的高度设置
    const embedCode = `
    <iframe 
        src="${appConfig.baseUrl}/${locale}/?embed=true" 
        style="width: 100%; height: 520px; border: none; overflow: hidden;"
        title="${t1('title')}"
        loading="lazy">
    </iframe>`

    const handleCopy = async () => {
        await navigator.clipboard.writeText(embedCode)
        toast({
            description: t('copied'),
            duration: 2000,
        })
    }

    return (
        <>
            <Button
                variant="ghost"
                className="bg-purple-400/90 hover:bg-purple-500 text-white px-4 py-2 transform hover:scale-105 transition-all duration-300 shadow-sm flex items-center gap-2 text-sm"
                onClick={() => setOpen(true)}
                aria-label={t('button')}
            >
                <Code2 className="h-4 w-4" />
                <span>{t('button')}</span>
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md max-w-6xl">
                    <div className="grid grid-cols-2 gap-6">
                        {/* 左侧区域：标题和代码 */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <DialogTitle className="text-xl font-semibold">
                                    {t('title')}
                                </DialogTitle>
                                <DialogDescription className="text-sm text-gray-600 dark:text-gray-300">
                                    {t('description')}
                                </DialogDescription>
                            </div>

                            <div className="relative">
                                <pre className="bg-purple-50/80 dark:bg-purple-900/20 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap break-words border border-purple-100">
                                    {embedCode}
                                </pre>
                                <Button
                                    className="absolute top-3 right-3 bg-purple-400 hover:bg-purple-500 transition-all duration-300 opacity-90 hover:opacity-100"
                                    size="sm"
                                    onClick={handleCopy}
                                >
                                    {t('copy')}
                                </Button>
                            </div>
                        </div>

                        {/* 右侧区域：预览 */}
                        <div>
                            <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <h3 className="text-sm font-medium mb-2">{t('preview')}</h3>
                                <div className="w-full h-[570px] overflow-hidden">
                                    <iframe
                                        src={`${appConfig.baseUrl}/${locale}/?embed=true`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            border: 'none',
                                        }}
                                        title={`${t1('title')} ${t1('preview')}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}