import { ServiceType } from '@/types'

export const SERVICE_TYPES: ServiceType[] = [
  '랜딩페이지 제작',
  '홈페이지 제작',
  '랜딩&홈페이지 제작',
  '기타(weflow 케어플랜)',
]

export const TIME_SLOTS: string[] = [
  '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30',
]

export interface PlanDefinition {
  name: string
  originalPrice: number
  salePrice: number
  discountRate: string
  isMaster?: boolean
  features: string[]
  perMonth?: boolean
}

export interface AdSettingDefinition {
  name: string
  originalPrice: number
  salePrice: number
  discountRate: string
  features: string[]
}

export const BUILD_PLANS: PlanDefinition[] = [
  {
    name: 'START',
    originalPrice: 498000,
    salePrice: 249000,
    discountRate: '50% OFF',
    features: ['랜딩 1p', '3~4일 제작', '반응형', '문의폼 연동', '기본 SEO'],
  },
  {
    name: 'GROW',
    originalPrice: 1980000,
    salePrice: 990000,
    discountRate: '50% OFF',
    features: ['홈 5p', '1주 제작', '반응형', '문의폼 연동', '카카오 상담연동', '기본SEO'],
  },
  {
    name: 'MASTER',
    originalPrice: 2980000,
    salePrice: 1490000,
    discountRate: '50% OFF',
    isMaster: true,
    features: ['홈+랜딩', '1~2주', '프리미엄 디자인', '예약·문의 시스템', 'SEO최적화', '광고 전환구조 설계'],
  },
]

export const CARE_PLANS: PlanDefinition[] = [
  {
    name: 'WE CARE',
    originalPrice: 170000,
    salePrice: 89000,
    discountRate: '47% OFF',
    perMonth: true,
    features: [
      '월 유지보수 2회',
      '블로그 업로드 월 1회',
      '인스타 업로드 월 1회',
      '스레드 업로드 월 1회',
      '광고 세팅 할인 적용',
    ],
  },
  {
    name: 'FLOW CARE',
    originalPrice: 378000,
    salePrice: 189000,
    discountRate: '50% OFF',
    perMonth: true,
    features: [
      '월 유지보수 4회',
      '블로그 업로드 월 2회',
      '인스타 업로드 월 2회',
      '스레드 업로드 월 2회',
      '광고 세팅 할인 적용',
    ],
  },
  {
    name: 'WEFLOW CARE',
    originalPrice: 678000,
    salePrice: 339000,
    discountRate: '50% OFF',
    isMaster: true,
    perMonth: true,
    features: [
      '월 유지보수 8회',
      '블로그 업로드 월 4회',
      '인스타 업로드 월 4회',
      '스레드 업로드 월 4회',
      '광고 세팅 할인 적용',
    ],
  },
]

export const AD_SETTING_PLANS: AdSettingDefinition[] = [
  {
    name: '네이버 키워드',
    originalPrice: 298000,
    salePrice: 149000,
    discountRate: '50% OFF',
    features: [
      '키워드분석',
      '광고세팅지원',
      '광고문구제작',
      '문의 구조 연결',
      '채널연동',
      '성과최적화',
    ],
  },
  {
    name: '당근 플레이스',
    originalPrice: 158000,
    salePrice: 79000,
    discountRate: '50% OFF',
    features: [
      '지역키워드분석',
      '광고세팅지원',
      '광고문구제작',
      '문의 구조 연결',
      '채널연동',
      '랜딩 연결 지원',
    ],
  },
]

export const PLAN_NOTES = [
  '※ 도메인은 고객 명의로 진행되며 비용은 별도입니다. 위플로우 등록/연결은 무료로 지원합니다.',
  '※ 광고비는 고객이 직접 결제하며, 위플로우는 광고 운영 및 세팅만 담당합니다.',
  '※ 유지보수는 텍스트·이미지·링크 등 경미한 수정 기준입니다.',
  '※ 페이지 추가 및 기능 추가는 별도 비용이 발생합니다.',
]

export const REVIEW_LIST = [
  { name: '김민준', business: 'PT샵', rating: 5, content: '홈페이지 제작 후 문의가 3배 늘었어요. 정말 만족합니다!' },
  { name: '이서연', business: '필라테스', rating: 5, content: '빠른 제작과 꼼꼼한 사후 관리에 감동받았습니다.' },
  { name: '박지훈', business: '카페', rating: 5, content: '광고 연동까지 해주셔서 매출이 눈에 띄게 올랐어요.' },
  { name: '최유진', business: '미용실', rating: 5, content: '디자인도 예쁘고 모바일에서도 완벽하게 보여요.' },
  { name: '정다은', business: '네일샵', rating: 5, content: '24시간 상담 덕분에 항상 빠르게 해결됩니다.' },
  { name: '한승우', business: '헬스장', rating: 5, content: '케어플랜으로 운영까지 맡기니 정말 편합니다.' },
  { name: '오지은', business: '보험설계', rating: 5, content: '전문적인 홈페이지로 고객 신뢰가 많이 높아졌어요.' },
  { name: '임재현', business: '법률사무소', rating: 5, content: '복잡한 요구사항도 완벽하게 구현해주셨습니다.' },
  { name: '신예린', business: '인테리어', rating: 5, content: '포트폴리오 사이트가 너무 예쁘게 나왔어요.' },
  { name: '강민호', business: '세무사사무소', rating: 5, content: '검색 상위 노출까지 잡아주셔서 대만족입니다.' },
  { name: '조수아', business: '공인중개사', rating: 5, content: '홈페이지 오픈 후 전화 문의가 확실히 늘었어요.' },
  { name: '윤지수', business: '피부관리샵', rating: 5, content: '고급스러운 디자인으로 프리미엄 이미지 구축했어요.' },
  { name: '백준영', business: '자동차 디테일링', rating: 5, content: '전문성이 느껴지는 사이트 제작 감사합니다.' },
  { name: '황서진', business: '왁싱샵', rating: 5, content: '예약 시스템 연동까지 완벽하게 구현해주셨어요.' },
  { name: '송민재', business: '애견미용', rating: 5, content: '귀엽고 전문적인 디자인 정말 만족스럽습니다.' },
  { name: '류하은', business: '키즈카페', rating: 5, content: '아이들 테마에 맞는 생동감 있는 사이트예요.' },
  { name: '노승현', business: '스터디카페', rating: 5, content: '깔끔한 디자인으로 학생들 반응이 너무 좋아요.' },
  { name: '장지원', business: '영어학원', rating: 5, content: '학부모 문의가 제작 직후부터 바로 들어왔어요.' },
  { name: '문채원', business: '수학학원', rating: 5, content: '빠른 제작과 꼼꼼한 수정으로 완성도가 높아요.' },
  { name: '권태민', business: '입시학원', rating: 5, content: '브랜딩까지 신경써주셔서 학원 이미지가 달라졌어요.' },
  { name: '서하린', business: '이사업체', rating: 5, content: '로컬 SEO 세팅으로 지역 검색에 상위 노출됩니다.' },
  { name: '배지민', business: '청소업체', rating: 5, content: '깔끔한 사이트로 고객 신뢰도가 확실히 올랐어요.' },
  { name: '구승민', business: '반영구샵', rating: 5, content: '포트폴리오가 예쁘게 담겨서 고객들이 좋아해요.' },
  { name: '허다연', business: '웨딩/스냅', rating: 5, content: '감성적인 디자인으로 브랜드 이미지가 완성됐어요.' },
  { name: '전민석', business: '렌터카업체', rating: 5, content: '예약 연동과 광고까지 원스톱으로 완벽해요.' },
]

export const CASE_LIST = [
  { id: 1, name: 'PT샵 성공사례', business: 'PT샵', image: '/cases/ptshop.jpg', url: 'https://weflow-ten.vercel.app/cases' },
  { id: 2, name: '필라테스 성공사례', business: '필라테스', image: '/cases/pilates.jpg', url: 'https://weflow-ten.vercel.app/cases' },
  { id: 3, name: '헬스장 성공사례', business: '헬스장', image: '/cases/gym.jpg', url: 'https://weflow-ten.vercel.app/cases' },
  { id: 4, name: '미용실 성공사례', business: '미용실', image: '/cases/hair.jpg', url: 'https://weflow-ten.vercel.app/cases' },
  { id: 5, name: '카페 성공사례', business: '카페', image: '/cases/cafe.jpg', url: 'https://weflow-ten.vercel.app/cases' },
  { id: 6, name: '네일샵 성공사례', business: '네일샵', image: '/cases/nail.jpg', url: 'https://weflow-ten.vercel.app/cases' },
  { id: 7, name: '인테리어 성공사례', business: '인테리어', image: '/cases/interior.jpg', url: 'https://weflow-ten.vercel.app/cases' },
  { id: 8, name: '법률사무소 성공사례', business: '법률사무소', image: '/cases/law.jpg', url: 'https://weflow-ten.vercel.app/cases' },
]

export const BUSINESS_TYPES = [
  'PT샵', '필라테스', '헬스장', '보험설계', '법률사무소',
  '자동차 디테일링', '렌터카 업체', '웨딩/스냅 업체', '세무사사무소', '공인중개사',
  '카페', '미용실', '네일샵', '소상공인 기업형 홈페이지', '피부관리샵',
  '왁싱샵', '반영구샵', '애견미용', '반려동물 용품점', '인테리어 업체',
  '이사 업체', '키즈카페', '스터디카페', '영어학원', '수학학원',
  '입시학원', '개인과외', '청소업체',
]

export const EXTERNAL_LINKS = {
  phone: '010-2971-7280',
  email: 'contact@weflowlab.kr',
  kakao: 'http://pf.kakao.com/_xntCbX',
  blog: 'https://m.blog.naver.com/weflowlab',
  instagram: 'https://www.instagram.com/weflowlab.kr',
  facebook: 'https://www.facebook.com/profile.php?id=61590187124682',
}
