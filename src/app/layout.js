import './globals.css'
import 'bulma/css/bulma.min.css';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Any Time Flix 📽️',
  description: 'Your favorite movies, any time.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
