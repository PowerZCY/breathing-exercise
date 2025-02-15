// import dynamic from 'next/dynamic'
import BreathingInstructions from '@/components/BreathingInstructions'
import ClientBreathingWrapper from '@/components/ClientBreathingWrapper'

// const ClientBreathingWrapper = dynamic(
//   () => import('@/components/ClientBreathingWrapper'),
//   {
//     loading: () => (
//       <div className="w-full max-w-md mx-auto p-6 bg-blue-50 rounded-lg shadow-lg min-h-[600px] flex items-center justify-center">
//         <div className="text-lg">Loading...</div>
//       </div>
//     ),
//     ssr: false
//   }
// )

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start bg-blue-50 py-4">
      <div className="container mx-auto px-4 flex flex-col items-center relative">
        <div className="w-full flex justify-center min-h-[600px] mb-1">
          <ClientBreathingWrapper />
        </div>
        <div className="w-full flex justify-center opacity-0 transition-opacity duration-500" 
             style={{ animation: 'fadeIn 0.5s ease-in forwards 0.5s' }}>
          <BreathingInstructions />
        </div>
      </div>
    </main>
  )
}