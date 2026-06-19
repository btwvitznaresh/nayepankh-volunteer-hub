import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'NayePankh — Smart Volunteer Hub',
  description: 'Empowering volunteers to create change. Join NayePankh and be part of something meaningful.',
  keywords: ['volunteer', 'NGO', 'NayePankh', 'donate', 'social impact'],
  openGraph: {
    title: 'NayePankh — Smart Volunteer Hub',
    description: 'Empowering volunteers to create change.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1f2937',
                color: '#f9fafb',
                borderRadius: '12px',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#f97316', secondary: '#fff' } },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
