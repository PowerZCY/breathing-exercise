/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Globe } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LanguageButton } from '@/components/ui/language-button'
import { appConfig } from '@/lib/appConfig'

export default function LanguageSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const handleLocaleChange = (newLocale: string) => {
        const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`)
        router.push(newPathname)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <LanguageButton
                    variant="ghost"
                    size="icon"
                    className="bg-purple-400 hover:bg-purple-500 text-white transform hover:scale-110 transition-all duration-300"
                >
                    <Globe className="h-5 w-5" />
                </LanguageButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="bg-white/90 dark:bg-gray-800/90 border-purple-100 dark:border-purple-800 w-[280px] p-2 backdrop-blur-sm"
            >
                <div className="grid grid-cols-3 gap-1">
                    {appConfig.i18n.locales.map((loc) => (
                        <DropdownMenuItem
                            key={loc}
                            className={`
                                px-3 py-2 text-sm cursor-pointer text-center justify-center
                                transition-all duration-300 ease-in-out
                                hover:scale-105 hover:shadow-md
                                rounded-md
                                ${locale === loc 
                                    ? 'bg-purple-400 text-white font-medium shadow-lg scale-105' 
                                    : 'hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-800/30 dark:hover:text-green-200'
                                }
                            `}
                            onClick={() => handleLocaleChange(loc)}
                        >
                            {appConfig.i18n.localeLabels[loc]}
                        </DropdownMenuItem>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}