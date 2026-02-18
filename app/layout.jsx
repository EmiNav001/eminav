import './globals.css'

export const metadata = {
  title: 'Navigate Your Health with Clarity',
  description: 'Intent-based healthcare navigation for Africa. Find the right healthcare facility nearest to you.',
  keywords: ['healthcare', 'africa', 'nairobi', 'lagos', 'hospital', 'clinic', 'emergency', 'pharmacy', 'diagnostic'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

