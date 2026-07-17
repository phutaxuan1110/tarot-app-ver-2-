import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tarot Học - Learn Tarot in Vietnamese',
  description: 'Learn all 78 Tarot cards with interactive learning modes: Flashcard, Quiz, Spread Practice, and Context Matching',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>✨</text></svg>" />
      </head>
      <body className="bg-slate-950 text-white">
        {children}
      </body>
    </html>
  )
}
