'use client'
import { useState } from 'react'
import { Nav }         from '@/components/landing/Nav'
import { Hero }        from '@/components/landing/Hero'
import { LogoStrip }   from '@/components/landing/LogoStrip'
import { Services }    from '@/components/landing/Services'
import { Method }      from '@/components/landing/Method'
import { Cases }       from '@/components/landing/Cases'
import { Stack }       from '@/components/landing/Stack'
import { Testimonial } from '@/components/landing/Testimonial'
import { FAQ }         from '@/components/landing/FAQ'
import { CTA }         from '@/components/landing/CTA'
import { Footer }      from '@/components/landing/Footer'
import { BookingModal } from '@/components/ui/BookingModal'

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      <Nav onBook={() => setBookingOpen(true)} />
      <main id="top">
        <Hero    onBook={() => setBookingOpen(true)} />
        <LogoStrip />
        <Services />
        <Method />
        <Cases />
        <Stack />
        <Testimonial />
        <FAQ />
        <CTA onBook={() => setBookingOpen(true)} />
      </main>
      <Footer />
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  )
}
