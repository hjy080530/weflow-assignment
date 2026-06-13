import 'server-only'

import { publishRealtimeUpdate } from './realtime'
import { createSupabaseAdminClient } from './supabase'
import { mockInquiries, mockReservations } from './mock-admin-data'
import type { Reservation, Inquiry, Status } from '@/types'

type InquiryInput = Omit<Inquiry, 'id' | 'created_at' | 'status'>
type ReservationInput = Omit<Reservation, 'id' | 'created_at' | 'status'>

function throwSupabaseError(error: { message: string } | null): void {
  if (error) throw new Error(error.message)
}

export async function insertInquiry(data: InquiryInput): Promise<void> {
  const supabase = createSupabaseAdminClient()
  const { error } = await supabase.from('inquiries').insert({
    name: data.name,
    phone: data.phone,
    service_type: data.service_type,
    business_type: data.business_type,
    note: data.note,
  })
  throwSupabaseError(error)
  publishRealtimeUpdate()
}

export async function insertReservation(data: ReservationInput): Promise<void> {
  const supabase = createSupabaseAdminClient()
  const { error } = await supabase.from('reservations').insert({
    name: data.name,
    phone: data.phone,
    date: data.date,
    time: data.time,
    service_type: data.service_type,
    business_type: data.business_type,
    note: data.note,
  })
  throwSupabaseError(error)
  publishRealtimeUpdate()
}

export async function getReservations(): Promise<Reservation[]> {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from('reservations')
    .select('id, created_at, name, phone, date, time, service_type, business_type, note, status')
    .order('created_at', { ascending: false })
  throwSupabaseError(error)
  return (data ?? []) as Reservation[]
}

export async function getInquiries(): Promise<Inquiry[]> {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from('inquiries')
    .select('id, created_at, name, phone, service_type, business_type, note, status')
    .order('created_at', { ascending: false })
  throwSupabaseError(error)
  return (data ?? []) as Inquiry[]
}

export async function updateReservationStatus(id: string, status: Status): Promise<void> {
  const supabase = createSupabaseAdminClient()
  const { error } = await supabase.from('reservations').update({ status }).eq('id', id)
  throwSupabaseError(error)
  publishRealtimeUpdate()
}

export async function updateInquiryStatus(id: string, status: Status): Promise<void> {
  const supabase = createSupabaseAdminClient()
  const { error } = await supabase.from('inquiries').update({ status }).eq('id', id)
  throwSupabaseError(error)
  publishRealtimeUpdate()
}

export async function deleteReservation(id: string): Promise<void> {
  const supabase = createSupabaseAdminClient()
  const { error } = await supabase.from('reservations').delete().eq('id', id)
  throwSupabaseError(error)
  publishRealtimeUpdate()
}

export async function deleteInquiry(id: string): Promise<void> {
  const supabase = createSupabaseAdminClient()
  const { error } = await supabase.from('inquiries').delete().eq('id', id)
  throwSupabaseError(error)
  publishRealtimeUpdate()
}

export async function seedTestData(): Promise<void> {
  const supabase = createSupabaseAdminClient()
  const { error: reservationError } = await supabase
    .from('reservations')
    .upsert(mockReservations, { onConflict: 'id' })
  throwSupabaseError(reservationError)

  const { error: inquiryError } = await supabase
    .from('inquiries')
    .upsert(mockInquiries, { onConflict: 'id' })
  throwSupabaseError(inquiryError)

  publishRealtimeUpdate()
}
