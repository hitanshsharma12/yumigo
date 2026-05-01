import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'YumiGo Bakery — Go For Yumi',
  description: 'Premium custom cakes & bakery in Shimla. Order online with instant WhatsApp confirmation.',
  openGraph: {
    title: 'YumiGo Bakery',
    description: 'Order custom cakes with egg/eggless options, same-day delivery.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="bottom-right" toastOptions={{
          style: { background: '#4A2C0A', color: '#FDF6EC', fontFamily: 'Lato, sans-serif' }
        }} />
      </body>
    </html>
  )
}