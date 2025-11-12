import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext' // ← Change this line

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Keam Visuals - Professional Design Services',
  description: '2 years of design experience. Twitch, YouTube, and custom graphics.',
  themeColor: '#000000', // ← Add this for theme color
  openGraph: {
    title: 'Keam Visuals - Professional Design Services',
    description: '2 years of design experience. Twitch, YouTube, and custom graphics.',
    url: 'https://keamvisuals.com',
    siteName: 'Keam Visuals',
    images: [
      {
        url: 'https://i.imgur.com/FDBOf9y.png',
        width: 1200,
        height: 630,
        alt: 'Keam Visuals - Professional Design Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keam Visuals - Professional Design Services',
    description: '2 years of design experience. Twitch, YouTube, and custom graphics.',
    images: ['https://i.imgur.com/FDBOf9y.png'],
  },
  // Optional: Also add these for broader browser support
  other: {
    'msapplication-TileColor': '#000000',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}