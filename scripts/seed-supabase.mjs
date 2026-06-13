import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

function loadLocalEnv() {
  const text = readFileSync('.env.local', 'utf8')
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const index = trimmed.indexOf('=')
    if (index === -1) continue
    const key = trimmed.slice(0, index)
    const value = trimmed.slice(index + 1).replace(/^['"]|['"]$/g, '')
    process.env[key] ||= value
  }
}

function readRows(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker)
  const end = source.indexOf(endMarker, start)
  if (start === -1 || end === -1) {
    throw new Error(`Cannot find ${startMarker}`)
  }
  const expression = source
    .slice(start + startMarker.length, end)
    .replace(/\s+as const\s*$/, '')
    .trim()
  return Function(`"use strict"; return (${expression});`)()
}

loadLocalEnv()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY가 없습니다.')
}

const source = readFileSync('lib/mock-admin-data.ts', 'utf8')
const reservationRows = readRows(source, 'const reservationRows = ', '\n\nconst inquiryRows')
const inquiryRows = readRows(source, 'const inquiryRows = ', '\n\nexport const mockReservations')

const reservations = reservationRows.map(
  ([id, created_at, name, phone, date, time, service_type, business_type, note, status]) => ({
    id,
    created_at,
    name,
    phone,
    date,
    time,
    service_type,
    business_type,
    note,
    status,
  })
)

const inquiries = inquiryRows.map(
  ([id, created_at, name, phone, service_type, business_type, note, status]) => ({
    id,
    created_at,
    name,
    phone,
    service_type,
    business_type,
    note,
    status,
  })
)

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

const { error: reservationError } = await supabase
  .from('reservations')
  .upsert(reservations, { onConflict: 'id' })

if (reservationError) throw reservationError

const { error: inquiryError } = await supabase
  .from('inquiries')
  .upsert(inquiries, { onConflict: 'id' })

if (inquiryError) throw inquiryError

console.log(`Seeded ${reservations.length} reservations and ${inquiries.length} inquiries.`)
