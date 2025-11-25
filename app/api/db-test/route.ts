import { NextResponse } from 'next/server'
import { connectToDatabase } from '../../../database/mongoose'

function redactMongoUri(uri?: string) {
  if (!uri) return undefined
  try {
    const u = new URL(uri)
    // Hide username/password if present
    if (u.username || u.password) {
      u.username = u.username ? '***' : ''
      u.password = u.password ? '***' : ''
    }
    // Hide long query string
    u.search = ''
    return u.toString()
  } catch {
    return '***'
  }
}

export async function GET() {
  const startedAt = Date.now()
  try {
    await connectToDatabase()
    const elapsedMs = Date.now() - startedAt
    return NextResponse.json(
      {
        ok: true,
        message: 'Database connection successful',
        elapsedMs,
        nodeEnv: process.env.NODE_ENV,
        mongoUriRedacted: redactMongoUri(process.env.MONGODB_URI),
      },
      { status: 200 }
    )
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Database connection failed',
        error: err?.message || String(err),
      },
      { status: 500 }
    )
  }
}
