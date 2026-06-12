import { supabase, createServiceClient } from './supabase'
import type { Reservation, Inquiry, Status } from '@/types'

// 공개용 (anon key) — 폼 제출
export async function insertInquiry(
  data: Omit<Inquiry, 'id' | 'created_at' | 'status'>
): Promise<void> {
  const { error } = await supabase.from('inquiries').insert(data)
  if (error) throw new Error(error.message)
}

export async function insertReservation(
  data: Omit<Reservation, 'id' | 'created_at' | 'status'>
): Promise<void> {
  const { error } = await supabase.from('reservations').insert(data)
  if (error) throw new Error(error.message)
}

// 관리자용 (service role)
export async function getReservations(): Promise<Reservation[]> {
  const client = createServiceClient()
  const { data, error } = await client
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data as Reservation[]
}

export async function getInquiries(): Promise<Inquiry[]> {
  const client = createServiceClient()
  const { data, error } = await client
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data as Inquiry[]
}

export async function updateReservationStatus(
  id: string,
  status: Status
): Promise<void> {
  const client = createServiceClient()
  const { error } = await client
    .from('reservations')
    .update({ status })
    .eq('id', id)
  if (error) throw new Error(error.message)
}

export async function updateInquiryStatus(
  id: string,
  status: Status
): Promise<void> {
  const client = createServiceClient()
  const { error } = await client
    .from('inquiries')
    .update({ status })
    .eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteReservation(id: string): Promise<void> {
  const client = createServiceClient()
  const { error } = await client.from('reservations').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteInquiry(id: string): Promise<void> {
  const client = createServiceClient()
  const { error } = await client.from('inquiries').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
