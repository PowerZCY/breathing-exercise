import dynamic from 'next/dynamic'
import BreathingInstructions from '@/components/BreathingInstructions'

const ClientBreathingWrapper = dynamic(
  () => import('@/components/ClientBreathingWrapper'),
  {
    loading: () => <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">Loading...</div>
  }
)

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start bg-blue-50 py-4">
      <div className="container mx-auto px-2 flex flex-col items-center space-y-2">
        <ClientBreathingWrapper />
        <div className="w-full flex justify-center">
          <BreathingInstructions />
        </div>
      </div>
    </main>
  )
}