import 'server-only'

import { publishRealtimeUpdate } from './realtime'
import { createRecordId, createTimestamp, getDatabase } from './sqlite'
import { mockInquiries, mockReservations } from './mock-admin-data'
import type { Reservation, Inquiry, Status } from '@/types'

type InquiryInput = Omit<Inquiry, 'id' | 'created_at' | 'status'>
type ReservationInput = Omit<Reservation, 'id' | 'created_at' | 'status'>

interface ReservationRow {
  id: string
  created_at: string
  name: string
  phone: string
  date: string
  time: string
  service_type: Reservation['service_type']
  business_type: string
  note: string
  status: Status
}

interface InquiryRow {
  id: string
  created_at: string
  name: string
  phone: string
  service_type: Inquiry['service_type']
  business_type: string
  note: string
  status: Status
}

function mapReservation(row: ReservationRow): Reservation {
  return {
    id: row.id,
    created_at: row.created_at,
    name: row.name,
    phone: row.phone,
    date: row.date,
    time: row.time,
    service_type: row.service_type,
    business_type: row.business_type,
    note: row.note,
    status: row.status,
  }
}

function mapInquiry(row: InquiryRow): Inquiry {
  return {
    id: row.id,
    created_at: row.created_at,
    name: row.name,
    phone: row.phone,
    service_type: row.service_type,
    business_type: row.business_type,
    note: row.note,
    status: row.status,
  }
}

function seedIfEmpty(): void {
  const db = getDatabase()
  const { count: rCount } = db.prepare('SELECT COUNT(*) as count FROM reservations').get() as { count: number }
  const { count: iCount } = db.prepare('SELECT COUNT(*) as count FROM inquiries').get() as { count: number }

  if (rCount > 0 || iCount > 0) return

  const insertReservation = db.prepare(
    `INSERT OR IGNORE INTO reservations (
        id, created_at, name, phone, date, time, service_type, business_type, note, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )

  const insertInquiry = db.prepare(
    `INSERT OR IGNORE INTO inquiries (
        id, created_at, name, phone, service_type, business_type, note, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  )

  db.exec('BEGIN')
  try {
    for (const r of mockReservations) {
      insertReservation.run(r.id, r.created_at, r.name, r.phone, r.date, r.time, r.service_type, r.business_type, r.note, r.status)
    }
    for (const i of mockInquiries) {
      insertInquiry.run(i.id, i.created_at, i.name, i.phone, i.service_type, i.business_type, i.note, i.status)
    }
    db.exec('COMMIT')
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }
}

seedIfEmpty()

export async function insertInquiry(data: InquiryInput): Promise<void> {
  const db = getDatabase()

  db.prepare(
    `
      INSERT INTO inquiries (
        id, created_at, name, phone, service_type, business_type, note, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, '대기')
    `
  ).run(
    createRecordId(),
    createTimestamp(),
    data.name,
    data.phone,
    data.service_type,
    data.business_type,
    data.note
  )

  publishRealtimeUpdate()
}

export async function insertReservation(data: ReservationInput): Promise<void> {
  const db = getDatabase()

  db.prepare(
    `
      INSERT INTO reservations (
        id, created_at, name, phone, date, time, service_type, business_type, note, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, '대기')
    `
  ).run(
    createRecordId(),
    createTimestamp(),
    data.name,
    data.phone,
    data.date,
    data.time,
    data.service_type,
    data.business_type,
    data.note
  )

  publishRealtimeUpdate()
}

export async function getReservations(): Promise<Reservation[]> {
  const db = getDatabase()
  const rows = db
    .prepare(
      `
        SELECT id, created_at, name, phone, date, time, service_type, business_type, note, status
        FROM reservations
        ORDER BY created_at DESC
      `
    )
    .all() as ReservationRow[]

  return rows.map(mapReservation)
}

export async function getInquiries(): Promise<Inquiry[]> {
  const db = getDatabase()
  const rows = db
    .prepare(
      `
        SELECT id, created_at, name, phone, service_type, business_type, note, status
        FROM inquiries
        ORDER BY created_at DESC
      `
    )
    .all() as InquiryRow[]

  return rows.map(mapInquiry)
}

export async function updateReservationStatus(id: string, status: Status): Promise<void> {
  const db = getDatabase()
  db.prepare('UPDATE reservations SET status = ? WHERE id = ?').run(status, id)
  publishRealtimeUpdate()
}

export async function updateInquiryStatus(id: string, status: Status): Promise<void> {
  const db = getDatabase()
  db.prepare('UPDATE inquiries SET status = ? WHERE id = ?').run(status, id)
  publishRealtimeUpdate()
}

export async function deleteReservation(id: string): Promise<void> {
  const db = getDatabase()
  db.prepare('DELETE FROM reservations WHERE id = ?').run(id)
  publishRealtimeUpdate()
}

export async function deleteInquiry(id: string): Promise<void> {
  const db = getDatabase()
  db.prepare('DELETE FROM inquiries WHERE id = ?').run(id)
  publishRealtimeUpdate()
}
