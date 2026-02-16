import './globals.css'

export const metadata = {
  title: 'EmiNav - Navigate Your Life, Master Your Health',
  description: 'Intent-based healthcare navigation for Africa. Find the right healthcare facility in Nairobi and Lagos.',
  keywords: ['healthcare', 'africa', 'nairobi', 'lagos', 'hospital', 'emergency', 'pharmacy', 'diagnostic'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
