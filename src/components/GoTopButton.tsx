'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function GoTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    const t = useTranslations('home');

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {isVisible && (
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={scrollToTop}
                        className="fixed bottom-4 right-4 bg-purple-400 hover:bg-purple-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                          />
                        </svg>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t('goTop')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
        </>
    );
}