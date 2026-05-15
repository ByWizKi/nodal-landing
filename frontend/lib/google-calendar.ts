import { google } from 'googleapis'

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not set')
  const credentials = JSON.parse(raw)
  return new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })
}

export interface Slot {
  start: string
  end: string
}

/**
 * Returns available 30-min slots for the next 14 days
 * Mon–Fri 09:00–18:00 Europe/Paris
 */
export async function getAvailableSlots(): Promise<Slot[]> {
  const auth = getAuth()
  const calendar = google.calendar({ version: 'v3', auth })
  const calendarId = process.env.GOOGLE_CALENDAR_ID!

  const now = new Date()
  const twoWeeks = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)

  const freeBusy = await calendar.freebusy.query({
    requestBody: {
      timeMin: now.toISOString(),
      timeMax: twoWeeks.toISOString(),
      timeZone: 'Europe/Paris',
      items: [{ id: calendarId }],
    },
  })

  const busy = freeBusy.data.calendars?.[calendarId]?.busy ?? []

  const slots: Slot[] = []
  const cursor = new Date(now)
  // snap to next 30-min boundary
  cursor.setMinutes(cursor.getMinutes() < 30 ? 30 : 0, 0, 0)
  if (cursor.getMinutes() === 0) cursor.setHours(cursor.getHours() + 1)

  while (cursor < twoWeeks) {
    const day = cursor.getDay()
    const hour = cursor.getHours()

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 18) {
      const slotEnd = new Date(cursor.getTime() + 30 * 60 * 1000)
      const isBusy = busy.some((b) => {
        const bs = new Date(b.start!).getTime()
        const be = new Date(b.end!).getTime()
        return cursor.getTime() < be && slotEnd.getTime() > bs
      })
      if (!isBusy) {
        slots.push({ start: cursor.toISOString(), end: slotEnd.toISOString() })
      }
    }

    cursor.setMinutes(cursor.getMinutes() + 30)
  }

  return slots
}

export interface BookingData {
  name: string
  email: string
  company: string
  message: string
  start: string
  end: string
}

export async function createBooking(data: BookingData): Promise<string> {
  const auth = getAuth()
  const calendar = google.calendar({ version: 'v3', auth })
  const calendarId = process.env.GOOGLE_CALENDAR_ID!

  const event = await calendar.events.insert({
    calendarId,
    sendUpdates: 'all',
    conferenceDataVersion: 1,
    requestBody: {
      summary: `RDV Nodal — ${data.name}${data.company ? ` (${data.company})` : ''}`,
      description: data.message || undefined,
      start: { dateTime: data.start, timeZone: 'Europe/Paris' },
      end: { dateTime: data.end, timeZone: 'Europe/Paris' },
      attendees: [{ email: data.email, displayName: data.name }],
      conferenceData: {
        createRequest: {
          requestId: crypto.randomUUID(),
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    },
  })

  return event.data.id!
}
