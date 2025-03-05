import BreathingExercise from '@/components/BreathingExercise'
import BreathingInstructions from '@/components/BreathingInstructions'
import ClientBreathingWrapper from '@/components/ClientBreathingWrapper'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import GoTopButton from '@/components/GoTopButton'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import EmbedButton from '@/components/EmbedButton'
import { Toaster } from "@/components/Toaster"

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;  // 需要 await searchParams
  const isEmbedded = params?.embed === 'true';

  if (isEmbedded) {
    return <BreathingExercise />
  }

  return (
    <>
      <div className="relative min-h-screen">
        <div className="absolute top-4 right-4 z-50">
          <LanguageSwitcher />
        </div>
        <main className="w-full min-h-screen flex flex-col items-center justify-start bg-blue-50 py-4">
          <div className="container mx-auto px-4 flex flex-col items-center relative">
            <div className="w-full flex flex-col items-center gap-3 mb-12">
              <ClientBreathingWrapper />
              <EmbedButton />
            </div>
            <div className="w-full flex justify-center opacity-0 transition-opacity duration-500"
              style={{ animation: 'fadeIn 0.5s ease-in forwards 0.5s' }}>
              <BreathingInstructions />
            </div>
          </div>
        </main>
      </div>
      <GoTopButton />
      <GoogleAnalytics />
      <Toaster />
    </>
  )
}