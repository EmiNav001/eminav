import './globals.css'

export const metadata = {
  title: 'EmiNav - Navigate your health with clarity',
  description: 'Intent-based healthcare navigation for African cities.',
  keywords: ['healthcare', 'africa', 'nairobi', 'lagos', 'hospital', 'emergency', 'pharmacy', 'diagnostic'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

