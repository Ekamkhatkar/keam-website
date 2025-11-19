import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext' // ← Change this line

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Keam Visuals - Professional Design Services',
  description: '2 years of design experience.',
  themeColor: '#000000',
  openGraph: {
    title: 'Keam Visuals - Professional Design Services',
    description: '2 years of design experience.',
    url: 'https://keamvisuals.com',
    siteName: 'Keam Visuals',
    images: [
      {
        url: 'https://i.imgur.com/HdXpPH8.png',
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
    description: '2 years of design experience.',
    images: ['https://i.imgur.com/HdXpPH8.png'],
  },
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