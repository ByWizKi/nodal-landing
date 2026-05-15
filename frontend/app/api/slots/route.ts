import { NextResponse } from 'next/server'
import { getAvailableSlots } from '@/lib/google-calendar'

export const revalidate = 60

export async function GET() {
  try {
    const slots = await getAvailableSlots()
    return NextResponse.json({ slots })
  } catch (err) {
    console.error('[api/slots]', err)
    return NextResponse.json(
      { error: 'Impossible de charger les créneaux disponibles.' },
      { status: 500 }
    )
  }
}
