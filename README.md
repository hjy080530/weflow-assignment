# WEFLOW

홈페이지 제작 · 광고 운영 · 운영 관리를 제공하는 웹 에이전시 공식 사이트.

- 배포: https://weflow-web.vercel.app
- 관리자: `/admin` (badeagle85@gmail.com / 1111)

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 언어 | TypeScript strict (`any` 금지) |
| 프레임워크 | Next.js 16 (App Router) |
| 스타일링 | Tailwind CSS v4 |
| DB / 백엔드 | Supabase (폼 제출, 실시간 반영, 상태 관리) |
| 테스트 | Playwright E2E |
| 패키지 관리 | pnpm |
| 배포 | Vercel |

---

## 폴더 구조

```
weflow/
├── app/
│   ├── page.tsx                  # 메인 홈
│   ├── layout.tsx                # 루트 레이아웃 (Navbar, Footer, FloatingBar)
│   ├── service/page.tsx          # 서비스 소개
│   ├── plan/page.tsx             # 제작플랜 & 가격안내
│   ├── cases/page.tsx            # 성공사례
│   ├── reservation/page.tsx      # 예약
│   ├── diagnosis/page.tsx        # 무료진단
│   ├── landing/page.tsx          # 랜딩페이지
│   └── admin/
│       ├── page.tsx              # 관리자 대시보드
│       ├── login/page.tsx        # 관리자 로그인
│       └── layout.tsx
├── app/api/
│   ├── admin/                    # 관리자 API (login, logout, data, status, stream, row, seed)
│   ├── inquiries/route.ts        # 무료진단 폼 제출
│   └── reservations/route.ts     # 예약 폼 제출
├── components/
│   ├── layout/                   # Navbar, Footer, FloatingBar
│   ├── ui/                       # PlanCard, CaseCard, ReviewSlider, ProcessSteps, DiagnosisForm
│   └── admin/                    # ReservationTable, InquiryTable
├── hooks/
│   ├── useAdminTable.ts          # 관리자 테이블 + Supabase Realtime
│   ├── useReservation.ts         # 예약 폼 상태
│   ├── useInquiry.ts             # 문의 폼 상태
│   ├── useCounter.ts             # 숫자 카운터 애니메이션
│   └── useScrollReveal.ts        # 스크롤 등장 애니메이션
├── lib/
│   ├── supabase.ts               # Supabase 클라이언트
│   ├── queries.ts                # DB 쿼리 함수
│   ├── constants.ts              # 서비스 타입, 시간대, 후기 목록, 성공사례 등 상수
│   ├── excel.ts                  # 엑셀 다운로드 (예약/문의/전체)
│   ├── admin-auth.ts             # 관리자 인증 유틸
│   ├── realtime.ts               # Supabase Realtime 구독
│   └── mock-admin-data.ts        # 개발용 목업 데이터
├── types/index.ts                # 공통 타입 (Reservation, Inquiry, ServiceType, Status)
├── tests/                        # Playwright E2E 테스트
├── middleware.ts                 # 관리자 인증 미들웨어
└── data/weflow.sqlite            # SQLite (개발/로컬 폴백)
```

---

## 페이지

| 경로 | 설명 |
|------|------|
| `/` | 메인 홈 — 배너, 케어플랜 혜택, 성공사례, 제작 프로세스, 무료진단, 후기 슬라이더 |
| `/service` | 제작 진행 과정 6단계, 광고·사후관리 카드 |
| `/plan` | 제작플랜 3종 + 케어플랜 3종 + 광고 세팅 가격표 |
| `/cases` | 업종 28개 성공사례 카드 목록 |
| `/reservation` | 달력 + 시간대 선택 예약 폼 → Supabase 저장 |
| `/diagnosis` | 무료진단 폼 → Supabase 저장 |
| `/landing` | 좌측 콘텐츠 + 우측 sticky 문의창 레이아웃 |
| `/admin` | 관리자 대시보드 (예약/문의 관리, 상태 변경, 엑셀 다운로드) |
| `/admin/login` | 관리자 로그인 |

---

## 주요 기능

### 폼 → DB 연동
- `/diagnosis` 무료진단 폼 → `inquiries` 테이블 insert
- `/reservation` 예약 폼 → `reservations` 테이블 insert
- 제출 즉시 관리자 대시보드에 실시간 반영

### 관리자 대시보드
- Supabase Realtime 구독으로 폼 제출 즉시 반영
- 상태 관리: 대기 / 진행중 / 완료 필터 + 클릭으로 즉시 변경
- 행 펼침(▼): 제작종류 / 업종 / 추가요청사항 상세 확인
- 엑셀 다운로드 3종: 예약 전체 / 문의 전체 / 통합 전체

### 공통 컴포넌트
- **Navbar**: sticky top, 로고 + 6개 메뉴
- **FloatingBar**: 모든 페이지 하단 고정, 전화/카카오/블로그/무료진단 4버튼
- **DiagnosisForm**: `/diagnosis`, `/landing` 공용
- **ReviewSlider**: 25개+ 후기 2줄 자동 슬라이드 (3초)

---

## 디자인 시스템

토스(Toss) 스타일 — 여백 중심, 텍스트 계층 명확.

| 색상 | 값 |
|------|----|
| Primary | `#1B64DA` |
| Primary Dark (hover) | `#1348A8` |
| Text | `#191F28` |
| Text Sub | `#4E5968` |
| Text Muted | `#8B95A1` |
| Border | `#E5E8EB` |
| Background | `#F9FAFB` |
| Sale Red | `#F04452` |
| Crown Gold | `#F5A623` |

폰트: Pretendard (CDN)

---

## 시작하기

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경변수 설정

`.env.local.example`을 복사해 `.env.local` 생성:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### 3. Supabase 테이블 생성

Supabase 대시보드 SQL 에디터에서 실행:

```sql
-- reservations
create table reservations (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now(),
  name          text not null,
  phone         text not null,
  date          date not null,
  time          text not null,
  service_type  text not null,
  business_type text,
  note          text,
  status        text default '대기' check (status in ('대기', '진행중', '완료'))
);
alter table reservations enable row level security;
create policy "public insert" on reservations for insert with check (true);
create policy "service role all" on reservations using (auth.role() = 'service_role');

-- inquiries
create table inquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now(),
  name          text not null,
  phone         text not null,
  service_type  text not null,
  business_type text,
  note          text,
  status        text default '대기' check (status in ('대기', '진행중', '완료'))
);
alter table inquiries enable row level security;
create policy "public insert" on inquiries for insert with check (true);
create policy "service role all" on inquiries using (auth.role() = 'service_role');
```

### 4. 개발 서버 실행

```bash
pnpm dev
```

http://localhost:3000

---

## 스크립트

```bash
pnpm dev          # 개발 서버
pnpm build        # 프로덕션 빌드
pnpm start        # 프로덕션 서버
pnpm lint         # ESLint
pnpm seed:supabase  # Supabase 시드 데이터 삽입
```

---

## E2E 테스트 (Playwright)

```bash
# Playwright 브라우저 설치 (최초 1회)
npx playwright install

# 전체 테스트 실행 (dev 서버 자동 시작)
npx playwright test

# 특정 테스트만
npx playwright test tests/diagnosis.spec.ts
```

| 테스트 파일 | 시나리오 |
|-------------|----------|
| `diagnosis.spec.ts` | 무료진단 폼 제출 → 관리자 문의 목록 반영 |
| `reservation.spec.ts` | 예약 폼 제출 → 관리자 예약 목록 반영 |
| `admin-status.spec.ts` | 관리자 상태 변경 → 즉시 DB/UI 반영 |
| `excel-download.spec.ts` | 엑셀 다운로드 3종 검증 |

---

## Git 컨벤션

브랜치: `master` (배포) / `dev` (개발) / `feat/페이지명`

```
feat:     새 기능
fix:      버그 수정
style:    UI/스타일
refactor: 리팩토링
chore:    설정·의존성
test:     테스트
```

커밋 메시지는 commitlint (Conventional Commits) 적용.

---

## 외부 링크

| 항목 | 링크 |
|------|------|
| 전화 | 010-2971-7280 |
| 카카오톡 | http://pf.kakao.com/_xntCbX |
| 블로그 | https://m.blog.naver.com/weflowlab |
| 인스타그램 | https://www.instagram.com/weflowlab.kr |
| 페이스북 | https://www.facebook.com/profile.php?id=61590187124682 |
