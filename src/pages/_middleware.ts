import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export const middleware = async (req: NextApiRequest) => {
  const token = await getToken({ req: req, secret: process.env.JWT_SECRET! })

  const { pathname } = new URL(req.url || '')

  if (token && pathname === '/login') {
    return NextResponse.redirect('/')
  }

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login')
  }
}
