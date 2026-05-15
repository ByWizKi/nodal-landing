import { NextRequest, NextResponse } from 'next/server'
import { createBooking } from '@/lib/google-calendar'

export async function POST(req: NextRequest) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON invalide' }, { status: 400 })
  }

  const { name, email, company, message, start, end } = body

  if (!name?.trim() || !email?.trim() || !start || !end) {
    return NextResponse.json(
      { error: 'Champs requis manquants : name, email, start, end' },
      { status: 400 }
    )
  }

  try {
    const eventId = await createBooking({
      name: name.trim(),
      email: email.trim(),
      company: (company ?? '').trim(),
      message: (message ?? '').trim(),
      start,
      end,
    })
    return NextResponse.json({ success: true, eventId })
  } catch (err) {
    console.error('[api/book]', err)
    return NextResponse.json(
      { error: 'Erreur lors de la création du rendez-vous.' },
      { status: 500 }
    )
  }
}
