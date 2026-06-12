export type ServiceType =
  | '랜딩페이지 제작'
  | '홈페이지 제작'
  | '랜딩&홈페이지 제작'
  | '기타(weflow 케어플랜)'

export type Status = '대기' | '진행중' | '완료'

export interface Reservation {
  id: string
  created_at: string
  name: string
  phone: string
  date: string
  time: string
  service_type: ServiceType
  business_type: string
  note: string
  status: Status
}

export interface Inquiry {
  id: string
  created_at: string
  name: string
  phone: string
  service_type: ServiceType
  business_type: string
  note: string
  status: Status
}

export interface DiagnosisFormData {
  name: string
  phone: string
  service_type: ServiceType
  business_type: string
  note: string
  agreed: boolean
}
