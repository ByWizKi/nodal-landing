'use client'
import { useEffect, useState } from 'react'
import { Button } from './Button'

interface Slot {
  start: string
  end: string
}

function groupByDay(slots: Slot[]): [string, Slot[]][] {
  const map = new Map<string, Slot[]>()
  for (const s of slots) {
    const key = new Date(s.start).toDateString()
    const arr = map.get(key) ?? []
    arr.push(s)
    map.set(key, arr)
  }
  return Array.from(map.entries())
}

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

type Step = 'pick' | 'form' | 'done'

const FIELD_STYLE = {
  background: 'var(--surface)',
  borderColor: 'var(--border)',
  color: 'var(--ink)',
}

export function BookingModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<Step>('pick')
  const [selected, setSelected] = useState<Slot | null>(null)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Load slots when modal opens
  useEffect(() => {
    if (!open) return
    setLoading(true)
    fetch('/api/slots')
      .then((r) => r.json())
      .then((d) => setSlots(d.slots ?? []))
      .catch(() => setSlots([]))
      .finally(() => setLoading(false))
  }, [open])

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setStep('pick')
      setSelected(null)
      setError('')
      setForm({ name: '', email: '', company: '', message: '' })
    }
  }, [open])

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selected) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, start: selected.start, end: selected.end }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setStep('done')
      }
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  const grouped = groupByDay(slots)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Réserver un échange"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 cursor-pointer"
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-[680px] rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-xl)',
          maxHeight: '90vh',
        }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between px-8 py-6 border-b shrink-0"
          style={{ borderColor: 'var(--border)' }}
        >
          <div>
            <h2
              className="font-serif italic text-[28px] tracking-[-0.02em] m-0"
              style={{ color: 'var(--ink)' }}
            >
              Réserver un échange.
            </h2>
            <p className="text-[13px] mt-1 m-0" style={{ color: 'var(--ink-muted)' }}>
              30 min · Google Meet · Confirmation immédiate
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="w-8 h-8 flex items-center justify-center rounded-lg border transition-colors shrink-0 mt-1 cursor-pointer"
            style={{ borderColor: 'var(--border)', color: 'var(--ink-muted)', background: 'transparent' }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M4 4l8 8M4 12l8-8" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-8 py-6">
          {/* Step 1: slot picker */}
          {step === 'pick' && (
            <>
              {loading && (
                <div
                  className="flex items-center justify-center py-16 font-mono text-[12px] tracking-[0.1em] uppercase"
                  style={{ color: 'var(--ink-subtle)' }}
                >
                  Chargement des créneaux…
                </div>
              )}
              {!loading && slots.length === 0 && (
                <div
                  className="text-center py-16 font-serif italic text-[20px]"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  Aucun créneau disponible pour le moment.
                  <br />
                  <a
                    href="mailto:hello@nodal-ai-services.com"
                    className="underline"
                    style={{ color: 'var(--accent)' }}
                  >
                    Écrivez-nous directement →
                  </a>
                </div>
              )}
              {!loading &&
                grouped.map(([dayKey, daySlots]) => (
                  <div key={dayKey} className="mb-6">
                    <div
                      className="font-mono text-[11px] tracking-[0.1em] uppercase mb-3"
                      style={{ color: 'var(--ink-subtle)' }}
                    >
                      {formatDay(daySlots[0].start)}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {daySlots.map((slot) => {
                        const isSelected = selected?.start === slot.start
                        return (
                          <button
                            key={slot.start}
                            onClick={() => {
                              setSelected(slot)
                              setStep('form')
                            }}
                            className="h-9 px-4 rounded-lg border font-mono text-[14px] transition-all duration-100 cursor-pointer"
                            style={{
                              borderColor: isSelected
                                ? 'var(--accent)'
                                : 'var(--border)',
                              background: isSelected
                                ? 'var(--accent-soft)'
                                : 'var(--surface)',
                              color: isSelected ? 'var(--accent)' : 'var(--ink)',
                            }}
                          >
                            {formatTime(slot.start)}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
            </>
          )}

          {/* Step 2: form */}
          {step === 'form' && selected && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Slot recap */}
              <div
                className="flex items-center gap-3 p-4 rounded-xl border"
                style={{ background: 'var(--accent-soft)', borderColor: 'var(--accent)' }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="3" width="12" height="11" rx="2" />
                  <path d="M5 1v4M11 1v4M2 7h12" />
                </svg>
                <span className="text-[14px] flex-1" style={{ color: 'var(--accent)' }}>
                  {formatDay(selected.start)} à {formatTime(selected.start)}
                </span>
                <button
                  type="button"
                  onClick={() => setStep('pick')}
                  className="font-mono text-[12px] tracking-[0.06em] uppercase underline cursor-pointer"
                  style={{ color: 'var(--accent)', background: 'transparent', border: 'none' }}
                >
                  Changer
                </button>
              </div>

              {/* Fields */}
              {[
                { name: 'name',    label: 'Votre nom',    type: 'text',  required: true,  placeholder: 'Marie Dupont' },
                { name: 'email',   label: 'Email',        type: 'email', required: true,  placeholder: 'marie@entreprise.fr' },
                { name: 'company', label: 'Entreprise',   type: 'text',  required: false, placeholder: 'Roussel SAS' },
              ].map((f) => (
                <div key={f.name} className="flex flex-col gap-1.5">
                  <label
                    className="font-mono text-[11px] tracking-[0.1em] uppercase"
                    style={{ color: 'var(--ink-subtle)' }}
                  >
                    {f.label}
                    {f.required && (
                      <span style={{ color: 'var(--accent)' }}> *</span>
                    )}
                  </label>
                  <input
                    type={f.type}
                    required={f.required}
                    placeholder={f.placeholder}
                    value={form[f.name as keyof typeof form]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [f.name]: e.target.value }))
                    }
                    className="h-10 px-3 rounded-lg border text-[15px]"
                    style={FIELD_STYLE}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1.5">
                <label
                  className="font-mono text-[11px] tracking-[0.1em] uppercase"
                  style={{ color: 'var(--ink-subtle)' }}
                >
                  En quoi pouvons-nous vous aider ?
                </label>
                <textarea
                  rows={3}
                  placeholder="Décrivez brièvement votre activité et le problème que vous souhaitez résoudre…"
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className="px-3 py-2.5 rounded-lg border text-[15px] leading-[1.5] resize-none"
                  style={FIELD_STYLE}
                />
              </div>

              {error && (
                <p className="text-[13px] m-0" style={{ color: 'var(--red-500)' }}>
                  {error}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full justify-center"
              >
                {submitting ? 'Réservation en cours…' : 'Confirmer le rendez-vous'}
              </Button>
            </form>
          )}

          {/* Step 3: confirmation */}
          {step === 'done' && (
            <div className="text-center py-8 flex flex-col items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'var(--green-100)' }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--green-500)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3
                className="font-serif italic text-[28px] tracking-[-0.02em] m-0"
                style={{ color: 'var(--ink)' }}
              >
                C&apos;est noté.
              </h3>
              <p
                className="text-[15px] leading-[1.6] m-0"
                style={{ color: 'var(--ink-muted)', maxWidth: '38ch' }}
              >
                Une invitation Google Calendar vous a été envoyée. On se retrouve bientôt.
              </p>
              <Button variant="secondary" size="md" onClick={onClose} className="mt-2">
                Fermer
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
