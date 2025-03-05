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
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { appConfig } from '@/lib/appConfig'
import { Code2 } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { Metadata } from 'next'
import { useRouter } from 'next/navigation'

export default function EmbedButton() {
    const [open, setOpen] = useState(false)
    const t = useTranslations('embed')
    const { toast } = useToast()
    const locale = useLocale()

    const embedCode = `
    <iframe 
        src="${appConfig.baseUrl}/${locale}?embed=true" 
        style="width: 100%; height: 600px; border: none; border-radius: 8px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);"
        title="Breathing Exercise"
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
                size="icon"
                className="bg-purple-400 hover:bg-purple-500 text-white transform hover:scale-110 transition-all duration-300"
                onClick={() => setOpen(true)}
            >
                <Code2 className="h-5 w-5" />
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md max-w-2xl">
                    <DialogHeader className="space-y-3">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-xl font-semibold">
                                {t('title')}
                            </DialogTitle>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            {t('description')}
                        </p>
                    </DialogHeader>

                    <div className="relative mt-4 group">
                        <div className="relative">
                            <pre className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg font-mono text-sm overflow-x-auto whitespace-pre-wrap break-all">
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

                        <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <h3 className="text-sm font-medium mb-2">{t('preview')}</h3>
                            <div className="w-full h-[300px] bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
                                <iframe
                                    src={`${appConfig.baseUrl}/${locale}?embed=true`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        border: 'none',
                                    }}
                                    title="Breathing Exercise Preview"
                                />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}