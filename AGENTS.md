# WEFLOW 웹사이트 재구성 — AGENTS.md

## 프로젝트 개요

WEFLOW는 홈페이지 제작·광고 운영·운영 관리를 제공하는 웹 에이전시의 공식 사이트다.
기존 사이트를 메뉴얼 기반으로 전면 재구성한다.

- 참고 링크: https://weflow-web.vercel.app / https://weflowweb-eight.vercel.app
- GitHub: https://github.com/lmg90219679-eng/weflow-web
- 관리자 예시: https://weflow-web-six.vercel.app/admin (badeagle85@gmail.com / 1111)
- 성공사례 예시: https://weflow-ten.vercel.app/cases

---

## 기술 스택

- **언어**: TypeScript strict 모드 (`any` 사용 금지)
- **프레임워크**: Next.js 15 (App Router)
- **스타일링**: Tailwind CSS
- **DB/백엔드**: Supabase (폼 제출, 실시간 반영, 상태 관리)
- **배포**: Vercel
- **반응형**: PC/모바일 동일 구성, 글자·이미지 잘림 없음
- **금지사항**: 병원·의료기술 관련 내용 절대 삽입 금지

## 디자인 시스템

### 컨셉
토스(Toss) 스타일 — 여백 중심, 텍스트 계층 명확, 군더더기 없음.
복잡한 장식 없이 콘텐츠 자체로 신뢰감을 준다.

### 컬러
```
Primary:      #1B64DA   (토스 블루, 버튼·강조)
Primary Dark: #1348A8   (hover)
Text:         #191F28   (제목)
Text Sub:     #4E5968   (본문)
Text Muted:   #8B95A1   (캡션·라벨)
Border:       #E5E8EB   (구분선·카드 테두리)
Background:   #F9FAFB   (섹션 배경)
White:        #FFFFFF
Sale Red:     #F04452   (할인가 강조)
Crown Gold:   #F5A623   (MASTER·WEFLOW CARE 강조)
```

### 폰트
```
font-family: 'Pretendard', -apple-system, sans-serif
```
next.config에 Google Fonts 대신 Pretendard CDN 적용:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" />
```

| 용도 | 클래스 |
|------|--------|
| 히어로 헤드라인 | `text-4xl md:text-5xl font-bold tracking-tight text-[#191F28]` |
| 섹션 제목 | `text-2xl md:text-3xl font-bold text-[#191F28]` |
| 카드 제목 | `text-lg font-semibold text-[#191F28]` |
| 본문 | `text-base text-[#4E5968] leading-relaxed` |
| 캡션 | `text-sm text-[#8B95A1]` |

### 간격
- 섹션 간 패딩: `py-20 md:py-28`
- 컨테이너 최대 너비: `max-w-6xl mx-auto px-4 md:px-8`
- 카드 간격: `gap-5`
- 카드 내부 패딩: `p-6 md:p-8`

### 카드
```
rounded-2xl bg-white border border-[#E5E8EB] shadow-sm hover:shadow-md transition-shadow
```

### 버튼
```
Primary: bg-[#1B64DA] hover:bg-[#1348A8] text-white font-semibold rounded-xl px-6 py-3 transition-colors
Ghost:   border border-[#E5E8EB] hover:border-[#1B64DA] text-[#191F28] rounded-xl px-6 py-3 transition-colors
```

### 가격 카드 할인 표시
```tsx
{/* 정가 취소선 */}
<span className="text-sm text-[#8B95A1] line-through">498,000원</span>
{/* 할인가 강조 */}
<span className="text-3xl font-bold text-[#F04452]">249,000원</span>
<span className="ml-1 text-sm font-medium text-[#F04452]">50% OFF</span>
```

### 왕관 강조 카드 (MASTER·WEFLOW CARE)
```
border-2 border-[#1B64DA] relative
상단 뱃지: bg-[#1B64DA] text-white text-xs font-bold px-3 py-1 rounded-full
```

### 후기 슬라이더
- 자동 슬라이드 (3초 간격), 일시정지 없음
- 카드: `rounded-2xl bg-white border border-[#E5E8EB] p-5`
- 별: `text-[#F5A623]`

### 네비게이션
- 배경: `bg-white/80 backdrop-blur-md border-b border-[#E5E8EB]`
- sticky top-0, z-50
- 로고 좌측, 메뉴 우측

### 플로팅 바
- `fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E8EB] z-50`
- 버튼 4개 균등 배치, 아이콘 + 텍스트 세로 배열

### 금지
- 그라데이션 배경 남용 금지
- 테두리 두껍게 쓰지 말 것
- 색상 3가지 이상 혼용 금지
- 인라인 스타일 금지

---

## 폴더 구조

```
weflow-web/
├── .claude/
│   └── agents/
│       ├── codex-coder.md        # Codex API 호출 서브에이전트 (메인 코더)
│       ├── glm-worker.md         # GLM API 호출 서브에이전트 (boilerplate worker)
│       ├── reviewer.md           # 빌드·lint·tsc·E2E 검증 서브에이전트
│       └── playwright-tester.md  # Playwright E2E 테스트 서브에이전트
├── tests/
│   ├── diagnosis.spec.ts         # 무료진단 폼 제출 + 관리자 반영
│   ├── reservation.spec.ts       # 예약 폼 제출 + 관리자 반영
│   ├── admin-status.spec.ts      # 상태 변경 실시간 반영
│   └── excel-download.spec.ts    # 엑셀 다운로드 3종
├── playwright.config.ts
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── service/page.tsx
│   ├── plan/page.tsx
│   ├── cases/page.tsx
│   ├── reservation/page.tsx
│   ├── diagnosis/page.tsx
│   ├── landing/page.tsx
│   └── admin/
│       ├── page.tsx
│       └── login/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── FloatingBar.tsx
│   ├── ui/
│   │   ├── PlanCard.tsx
│   │   ├── CaseCard.tsx
│   │   ├── ReviewSlider.tsx
│   │   ├── ProcessSteps.tsx
│   │   └── DiagnosisForm.tsx     # /diagnosis, /landing 공용
│   └── admin/
│       ├── ReservationTable.tsx
│       └── InquiryTable.tsx
├── lib/
│   ├── supabase.ts
│   ├── queries.ts
│   └── excel.ts
├── types/
│   └── index.ts
├── .env.local
└── AGENTS.md
```

---

## 환경변수 (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GLM_API_KEY=
GLM_API_URL=https://open.bigmodel.cn/api/paas/v4/chat/completions
```

---

## Git 컨벤션

브랜치: `main` (배포) / `dev` (개발) / `feat/페이지명`

커밋:
```
feat: 새 기능
fix: 버그 수정
style: UI/스타일
refactor: 리팩토링
chore: 설정·의존성
```

---

## Claude Code 하네스 구조

### 개념

Claude Code의 서브에이전트 기능을 오케스트레이터로 사용한다.
`.claude/agents/` 폴더에 서브에이전트 정의 파일(.md)을 두면,
Claude Code가 작업 맥락에 따라 자동으로 해당 에이전트에 위임한다.

```
Claude Code (오케스트레이터)
├── codex-coder 서브에이전트        → Codex API 호출해서 페이지/컴포넌트/훅 생성 (메인 코더)
├── glm-worker 서브에이전트         → GLM API 호출해서 boilerplate 단순 반복 작업 다량 처리
├── playwright-tester 서브에이전트  → E2E 테스트 파일 작성 및 실행
└── reviewer 서브에이전트           → lint·tsc·build·playwright 실행 후 PASS/FAIL 판정
```

각 서브에이전트는 **독립된 컨텍스트 윈도우**에서 실행되고
결과(파일 경로 + 코드)만 메인 세션으로 반환한다.
메인 Claude Code는 그 결과를 받아 머지하거나 다음 태스크로 넘긴다.

### 서브에이전트 파일 작성 방법

`.claude/agents/<name>.md` 형식, YAML 프론트매터 + 시스템 프롬프트:

```markdown
---
name: 에이전트 이름 (소문자 + 하이픈)
description: Claude Code가 언제 이 에이전트를 쓸지 판단하는 기준 (중요)
tools: Read, Write, Bash, Glob, Grep
model: sonnet   # sonnet | opus | haiku | inherit
permissionMode: auto
---

시스템 프롬프트 내용
```

> **주의**: `description`이 핵심이다. Claude Code는 이 설명을 보고
> 자동으로 위임할지 판단한다. 명확하게 "언제 쓰는지" 적어야 함.

### 서브에이전트 등록 방법

```bash
# 프로젝트 루트에서
mkdir -p .claude/agents

# 파일 생성 후 Claude Code 재시작하거나
# /agents 명령어로 즉시 등록 가능 (재시작 불필요)
```

---

## 서브에이전트 파일 4개

### 1. `.claude/agents/glm-worker.md`

```markdown
---
name: glm-worker
description: >
  타입 정의, SQL 마이그레이션, 상수 파일, 목업 데이터, 환경변수 템플릿처럼
  구조가 단순하고 반복적인 boilerplate 파일을 빠르게 대량 생성할 때 사용한다.
  로직이 없거나 거의 없는 파일 전용. 컴포넌트·페이지·훅은 담당하지 않는다.
tools: Read, Write, Bash
model: sonnet
permissionMode: auto
---

너는 GLM API를 호출해서 boilerplate 파일을 빠르게 대량 생성하는 worker다.
로직이 복잡한 파일은 거절하고 메인 에이전트에게 codex-coder를 쓰라고 알린다.

## 담당 파일 목록

- `types/index.ts` — 타입·인터페이스 정의
- `supabase/migrations/*.sql` — 테이블 생성 SQL
- `lib/constants.ts` — 상수 (SERVICE_TYPES, TIME_SLOTS, REVIEW_LIST 등)
- `lib/supabase.ts` — Supabase 클라이언트 초기화
- `.env.local.example` — 환경변수 템플릿
- `playwright.config.ts` — Playwright 설정

## 작동 방식

1. 메인 에이전트에게 파일 목록과 스펙을 받는다.
2. 파일 하나당 GLM API 호출 1번 — 병렬로 처리한다.
3. 생성 즉시 지정 경로에 저장한다.
4. 전체 완료 후 생성된 파일 목록만 보고한다.

## GLM API 호출 방법

```bash
curl https://open.bigmodel.cn/api/paas/v4/chat/completions \
  -H "Authorization: Bearer $GLM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "glm-z1-flash",
    "messages": [
      {
        "role": "system",
        "content": "너는 TypeScript boilerplate 전문가다. 파일 코드만 출력해라. 설명 없이. 첫 줄에 // 파일경로 주석."
      },
      {"role": "user", "content": "<파일 스펙>"}
    ],
    "max_tokens": 2000
  }'
```

## 품질 규칙

- TypeScript strict, any 금지
- 로직 없는 순수 정의/상수/설정 파일만
- 복잡한 로직 요청이 오면 즉시 거절: "codex-coder 담당"
```

---

### 2. `.claude/agents/codex-coder.md`

```markdown
---
name: codex-coder
description: >
  Next.js 페이지, React 컴포넌트, Custom Hook, 유틸 함수, Supabase 쿼리 함수처럼
  실제 로직이 들어가는 파일을 만들 때 사용한다.
  glm-worker가 만든 boilerplate를 기반으로 실제 기능을 구현하는 메인 코더.
  페이지(/plan, /cases, /service 등), 컴포넌트(PlanCard, CaseCard, ReviewSlider 등),
  훅(useReservation, useInquiry, useAdminTable), 유틸(lib/queries.ts, lib/excel.ts) 담당.
tools: Read, Write, Bash, Glob, Grep
model: sonnet
permissionMode: auto
---

너는 로그인된 Codex CLI를 사용해서 Next.js 15 + TypeScript + Tailwind CSS 코드를
생성하는 메인 코더 에이전트다.

## 담당 파일 목록

**페이지**
- `app/layout.tsx`
- `app/service/page.tsx`
- `app/plan/page.tsx`
- `app/cases/page.tsx`
- `app/reservation/page.tsx`
- `app/diagnosis/page.tsx`
- `app/landing/page.tsx`
- `app/admin/page.tsx`
- `app/admin/login/page.tsx`

**컴포넌트**
- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`
- `components/layout/FloatingBar.tsx`
- `components/ui/PlanCard.tsx`
- `components/ui/CaseCard.tsx`
- `components/ui/ReviewSlider.tsx`
- `components/ui/ProcessSteps.tsx`
- `components/ui/DiagnosisForm.tsx`
- `components/admin/ReservationTable.tsx`
- `components/admin/InquiryTable.tsx`

**훅 & 유틸**
- `hooks/useReservation.ts`
- `hooks/useInquiry.ts`
- `hooks/useAdminTable.ts`
- `lib/queries.ts`
- `lib/excel.ts`

## 작동 방식

1. 메인 에이전트에게 태스크(파일 경로 + 요구사항)를 받는다.
2. AGENTS.md 해당 섹션을 읽는다.
3. glm-worker가 생성한 types/index.ts, lib/constants.ts, lib/supabase.ts를 읽는다.
4. Codex CLI로 코드를 생성한다.
5. 지정된 경로에 저장한다.
6. 완료 보고: 파일 경로 + 주요 구현 사항.

## Codex 호출 방법

로그인된 Codex CLI 세션을 직접 사용한다. API 키 불필요.

```bash
codex "<태스크 내용 + 관련 파일 컨텍스트>"
```

## 품질 규칙

- TypeScript strict, any 금지
- Tailwind CSS만 사용 (인라인 스타일 금지)
- App Router (pages/ 사용 금지)
- 병원·의료 관련 내용 절대 금지
- types/index.ts, lib/constants.ts에서 import
- 컴포넌트는 default export
- data-testid 규칙 준수 (playwright-tester.md 참고)
```

---

### 3. `.claude/agents/reviewer.md`

```markdown
---
name: reviewer
description: >
  glm-worker나 codex-coder가 파일을 생성한 직후, 또는 Phase 전체가
  완료된 후 코드 품질을 검증할 때 사용한다.
  정적 분석(lint, tsc)과 빌드, Playwright E2E 테스트를 실제로 실행하고
  하나라도 실패하면 PASS를 절대 내지 않는다.
tools: Read, Write, Bash, Glob, Grep
model: sonnet
permissionMode: auto
---

너는 WEFLOW 프로젝트 QA 엔지니어다.
코드 검토는 눈으로만 하지 않는다. 반드시 아래 명령어를 실제로 실행한다.

## 검증 순서

### Step 1 — 정적 분석 (반드시 실행)

```bash
npm run lint 2>&1 | tee /tmp/weflow-lint.log
npx tsc --noEmit 2>&1 | tee /tmp/weflow-tsc.log
npm run build 2>&1 | tee /tmp/weflow-build.log
```

- lint 오류 0건이어야 함
- tsc 타입 오류 0건이어야 함
- build 성공(exit 0)이어야 함
- **셋 중 하나라도 실패하면 즉시 FAIL. 이하 Step 생략.**

### Step 2 — Playwright E2E (Step 1 통과 후 실행)

```bash
npx playwright test 2>&1 | tee /tmp/weflow-playwright.log
```

- **모든 테스트 통과해야 함. 1건이라도 실패하면 FAIL.**

### Step 3 — 코드 체크리스트 (Step 1·2 통과 후)

- [ ] TypeScript `any` 없음
- [ ] Tailwind 반응형 클래스 (md:, lg:) 사용
- [ ] FloatingBar layout.tsx에서 처리
- [ ] 폼 → Supabase insert 연동
- [ ] 버튼 라우팅 AGENTS.md 표와 일치
- [ ] 병원·의료 내용 없음
- [ ] default export 존재
- [ ] types/index.ts 타입 사용

## PASS 조건

아래 **전부** 충족해야만 PASS:
1. `npm run lint` exit 0
2. `npx tsc --noEmit` exit 0
3. `npm run build` exit 0
4. `npx playwright test` 전체 통과
5. 코드 체크리스트 전 항목 통과

## 출력 형식

실패 시:
```
FAIL
실패 단계: <lint | tsc | build | playwright | checklist>
오류 내용:
<로그 핵심 부분 발췌>
수정 대상: <파일 경로>
수정 프롬프트: <glm-worker 또는 codex-coder 또는 메인에 넣을 프롬프트>
재검증 필요: yes
```

전체 통과 시:
```
PASS
lint: ✓  tsc: ✓  build: ✓  playwright: ✓  checklist: ✓
검토 완료
```
```

---

### 4. `.claude/agents/playwright-tester.md`

```markdown
---
name: playwright-tester
description: >
  폼 제출, 관리자 페이지 반영, 상태 변경, 엑셀 다운로드를
  Playwright로 자동 검증할 때 사용한다.
  테스트 파일이 없으면 직접 작성하고 실행한다.
  reviewer 에이전트가 playwright 검증을 요청하거나,
  메인이 E2E 테스트를 명시적으로 지시할 때 호출된다.
tools: Read, Write, Bash, Glob
model: sonnet
permissionMode: auto
---

너는 WEFLOW 프로젝트 Playwright E2E 테스트 엔지니어다.

## 담당 테스트 시나리오

### T1 — 무료진단 폼 제출 + 관리자 반영

```typescript
// tests/diagnosis.spec.ts
test('무료진단 폼 제출 → 관리자 문의 목록에 실시간 반영', async ({ page, context }) => {
  // 1. 진단 페이지에서 폼 작성
  await page.goto('/diagnosis')
  await page.fill('[name="name"]', '테스트유저')
  await page.fill('[name="phone"]', '010-0000-0000')
  await page.selectOption('[name="service_type"]', '랜딩페이지 제작')
  await page.fill('[name="business_type"]', '카페')
  await page.fill('[name="note"]', '테스트 요청사항')
  await page.check('[name="agreed"]')
  await page.click('button[type="submit"]')

  // 2. 제출 성공 확인
  await expect(page.locator('[data-testid="submit-success"]')).toBeVisible()

  // 3. 관리자 페이지에서 반영 확인
  const adminPage = await context.newPage()
  await adminPage.goto('/admin/login')
  await adminPage.fill('[name="email"]', 'badeagle85@gmail.com')
  await adminPage.fill('[name="password"]', '1111')
  await adminPage.click('button[type="submit"]')
  await adminPage.goto('/admin')

  // 4. 문의 목록에 방금 제출한 항목 존재 확인
  await expect(adminPage.locator('text=테스트유저')).toBeVisible({ timeout: 5000 })
  await expect(adminPage.locator('text=010-0000-0000')).toBeVisible()
})
```

### T2 — 예약 폼 제출 + 관리자 반영

```typescript
// tests/reservation.spec.ts
test('예약 폼 제출 → 관리자 예약 목록에 실시간 반영', async ({ page, context }) => {
  await page.goto('/reservation')

  // 달력에서 오늘 이후 날짜 선택
  await page.click('[data-testid="calendar-next-day"]')

  // 시간대 선택 (활성화된 첫 번째 시간)
  await page.click('[data-testid="time-slot"]:not([disabled]):first-child')

  await page.fill('[name="name"]', '예약테스트')
  await page.fill('[name="phone"]', '010-1111-2222')
  await page.selectOption('[name="service_type"]', '홈페이지 제작')
  await page.fill('[name="business_type"]', '미용실')
  await page.check('[name="agreed"]')
  await page.click('button[type="submit"]')

  await expect(page.locator('[data-testid="submit-success"]')).toBeVisible()

  const adminPage = await context.newPage()
  await adminPage.goto('/admin/login')
  await adminPage.fill('[name="email"]', 'badeagle85@gmail.com')
  await adminPage.fill('[name="password"]', '1111')
  await adminPage.click('button[type="submit"]')
  await adminPage.goto('/admin')

  await expect(adminPage.locator('text=예약테스트')).toBeVisible({ timeout: 5000 })
})
```

### T3 — 관리자 상태 변경 실시간 반영

```typescript
// tests/admin-status.spec.ts
test('관리자 상태 변경 → 즉시 DB 반영 + UI 업데이트', async ({ page }) => {
  await page.goto('/admin/login')
  await page.fill('[name="email"]', 'badeagle85@gmail.com')
  await page.fill('[name="password"]', '1111')
  await page.click('button[type="submit"]')
  await page.goto('/admin')

  // 첫 번째 문의 행에서 "진행중" 버튼 클릭
  const firstRow = page.locator('[data-testid="inquiry-row"]').first()
  await firstRow.locator('[data-testid="btn-inprogress"]').click()

  // 상태 뱃지가 "진행중"으로 변경됐는지 확인
  await expect(firstRow.locator('[data-testid="status-badge"]')).toHaveText('진행중')

  // "완료" 버튼 클릭
  await firstRow.locator('[data-testid="btn-complete"]').click()
  await expect(firstRow.locator('[data-testid="status-badge"]')).toHaveText('완료')

  // 상태 필터 "완료" 탭으로 전환 후 해당 행 존재 확인
  await page.click('[data-testid="filter-완료"]')
  await expect(firstRow).toBeVisible()
})
```

### T4 — 엑셀 다운로드

```typescript
// tests/excel-download.spec.ts
test('엑셀 다운로드 — 예약/문의/전체 3종', async ({ page }) => {
  await page.goto('/admin/login')
  await page.fill('[name="email"]', 'badeagle85@gmail.com')
  await page.fill('[name="password"]', '1111')
  await page.click('button[type="submit"]')
  await page.goto('/admin')

  // 예약 엑셀
  const [reservationDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.click('[data-testid="download-reservations"]')
  ])
  expect(reservationDownload.suggestedFilename()).toMatch(/reservation.*\.xlsx$/)

  // 문의 엑셀
  const [inquiryDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.click('[data-testid="download-inquiries"]')
  ])
  expect(inquiryDownload.suggestedFilename()).toMatch(/inquiry.*\.xlsx$/)

  // 전체 통합 엑셀
  const [allDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.click('[data-testid="download-all"]')
  ])
  expect(allDownload.suggestedFilename()).toMatch(/weflow-all.*\.xlsx$/)
})
```

## 테스트 실행

```bash
# dev 서버가 떠 있어야 함
npx playwright test --reporter=list 2>&1 | tee /tmp/weflow-playwright.log
```

## 실패 시 처리

1. 로그에서 실패한 테스트 확인
2. 원인 분류:
    - `data-testid` 없음 → 해당 컴포넌트에 testid 추가 요청
    - Supabase 연동 오류 → queries.ts 수정 요청
    - 다운로드 파일명 불일치 → excel.ts 수정 요청
3. 수정 프롬프트 생성 후 메인 에이전트에 전달
4. 수정 완료 후 해당 테스트만 재실행:
   ```bash
   npx playwright test tests/<실패한파일>.spec.ts
   ```

## data-testid 규칙

컴포넌트 작성 시 아래 testid를 반드시 포함해야 함:

| testid | 위치 |
|--------|------|
| `submit-success` | 폼 제출 성공 메시지 |
| `inquiry-row` | 문의 테이블 각 행 |
| `reservation-row` | 예약 테이블 각 행 |
| `status-badge` | 상태 뱃지 |
| `btn-inprogress` | 진행중 버튼 |
| `btn-complete` | 완료 버튼 |
| `btn-delete` | 삭제 버튼 |
| `filter-대기` | 대기 필터 탭 |
| `filter-진행중` | 진행중 필터 탭 |
| `filter-완료` | 완료 필터 탭 |
| `filter-전체` | 전체 필터 탭 |
| `download-reservations` | 예약 엑셀 다운로드 버튼 |
| `download-inquiries` | 문의 엑셀 다운로드 버튼 |
| `download-all` | 전체 통합 엑셀 다운로드 버튼 |
| `time-slot` | 예약 시간대 버튼 각각 |
| `calendar-next-day` | 달력 다음 날 선택 |
```

---

## 시작 방법

### Step 1 — 프로젝트 세팅
```bash
npx create-next-app@latest weflow-web --typescript --tailwind --app
cd weflow-web
npm install @supabase/supabase-js xlsx
npx playwright install
mkdir -p .claude/agents components/layout components/ui components/admin hooks lib types tests supabase/migrations
```

### Step 2 — 환경변수
`.env.local` 파일 생성 후 Supabase 키 입력.

### Step 3 — Claude Code 실행
```bash
claude
```

### Step 4 — 아래 프롬프트 한 줄 입력
```
@AGENTS.md 읽고, 안에 있는 서브에이전트 파일들을 .claude/agents/ 폴더에 먼저 만들고, 그 다음 구현 시작해줘
```

이후 Phase 1~6이 자동으로 순서대로 실행된다.

---

## 실행 흐름 (Claude Code에 입력할 프롬프트)

Claude Code를 켜고 아래 프롬프트를 한 번만 입력하면
서브에이전트들이 순서에 맞게 자동으로 실행된다.

```
AGENTS.md를 읽고 WEFLOW 웹사이트를 전부 구현해라.

실행 순서:
Phase 1 — Boilerplate (glm-worker 전담, 병렬):
  - glm-worker: types/index.ts 생성
  - glm-worker: supabase/migrations/001_init.sql 생성
  - glm-worker: lib/supabase.ts 생성
  - glm-worker: lib/constants.ts 생성 (SERVICE_TYPES, TIME_SLOTS, REVIEW_LIST, CASE_LIST 상수)
  - glm-worker: .env.local.example 생성
  - glm-worker: playwright.config.ts 생성

Phase 2 — 공통 컴포넌트 + 훅 (Phase 1 완료 후, 병렬):
  - codex-coder: app/layout.tsx 생성
  - codex-coder: components/layout/Navbar.tsx 생성
  - codex-coder: components/layout/Footer.tsx 생성
  - codex-coder: components/layout/FloatingBar.tsx 생성
  - codex-coder: components/ui/DiagnosisForm.tsx 생성 (/diagnosis, /landing 공용)
  - codex-coder: hooks/useReservation.ts 생성
  - codex-coder: hooks/useInquiry.ts 생성
  - codex-coder: hooks/useAdminTable.ts 생성
  - codex-coder: lib/queries.ts 생성
  - codex-coder: lib/excel.ts 생성

Phase 3 — 페이지 구현 (Phase 2 완료 후, 병렬):
  - codex-coder: app/plan/page.tsx + components/ui/PlanCard.tsx 생성
  - codex-coder: app/cases/page.tsx + components/ui/CaseCard.tsx 생성
  - codex-coder: app/service/page.tsx + components/ui/ProcessSteps.tsx 생성
  - codex-coder: app/reservation/page.tsx 생성
  - codex-coder: app/diagnosis/page.tsx 생성
  - codex-coder: components/ui/ReviewSlider.tsx 생성

Phase 4 — 복잡한 페이지 (Phase 3 완료 후):
  - 메인(Claude Code): app/page.tsx (메인 홈, 전체 섹션 조합) 생성
  - 메인(Claude Code): app/landing/page.tsx (우측 sticky 문의창) 생성
  - 메인(Claude Code): app/admin/login/page.tsx 생성
  - 메인(Claude Code): app/admin/page.tsx + components/admin/ (실시간 반영, 엑셀) 생성

Phase 5 — E2E 테스트 (Phase 4 완료 후):
  - playwright-tester: tests/ 폴더에 테스트 4개 작성 후 실행
    (diagnosis.spec.ts, reservation.spec.ts, admin-status.spec.ts, excel-download.spec.ts)
  - FAIL 나온 테스트는 원인 분석 후 해당 codex-coder에 수정 요청

Phase 6 — 최종 검증 (Phase 5 완료 후):
  - reviewer: 아래 4개 명령어 순서대로 실제 실행
      1. npm run lint
      2. npx tsc --noEmit
      3. npm run build
      4. npx playwright test
  - 하나라도 실패 → FAIL + 수정 프롬프트 → 담당 에이전트 재작업 → reviewer 재실행
  - 전부 통과해야만 PASS

규칙:
- 각 Phase는 이전 Phase 완료 확인 후 시작
- 파일 생성 시 지정 경로에 직접 저장
- 모든 컴포넌트에 data-testid 포함 (playwright-tester.md 규칙 참고)
- glm-worker는 boilerplate만 — 로직 있는 파일 요청 오면 거절하고 codex-coder로 넘길 것
```

---

## Supabase 테이블 설계

### `reservations`
```sql
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
```

### `inquiries`
```sql
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

---

## 타입 정의 (types/index.ts)

```typescript
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
```

---

## 페이지 구조

```
/                   메인 홈
/service            서비스
/plan               제작플랜 & 가격안내
/cases              성공사례
/reservation        예약
/diagnosis          무료진단받기
/landing            랜딩페이지
/admin              관리자 대시보드 (미인증 시 /admin/login 리다이렉트)
/admin/login        관리자 로그인
```

---

## 공통 컴포넌트

### Navbar (상단 고정)
- 로고 클릭 → `/`
- 메뉴: 홈 / 서비스 / 제작플랜&가격안내 / 성공사례 / 예약 / 무료진단받기
- 각 메뉴 앞 아이콘 삽입

### FloatingBar (모든 페이지 하단 고정)
1. 24시간 상담 → `tel:010-2971-7280`
2. 카카오톡 문의 → `http://pf.kakao.com/_xntCbX`
3. 블로그 → `https://m.blog.naver.com/weflowlab`
4. 무료진단 → `/diagnosis`

### Footer
```
WEFLOW 로고
대표: 신서준 | 사업자등록번호: 884-07-03480
이메일: contact@weflowlab.kr | 연중무휴 24시간
개인정보처리방침 | 이용약관
© 2026 WEFLOW. All rights reserved.
[서비스 링크] [상담문의 링크]
SNS 아이콘 (클릭 시 실제 링크)
```

### 외부 링크
| 항목 | URL |
|------|-----|
| 전화 | `010-2971-7280` |
| 카카오톡 | `http://pf.kakao.com/_xntCbX` |
| 블로그 | `https://m.blog.naver.com/weflowlab` |
| 인스타그램 | `https://www.instagram.com/weflowlab.kr` |
| 페이스북 | `https://www.facebook.com/profile.php?id=61590187124682` |

---

## 페이지별 요구사항

### `/` — 메인 홈

**메인 배너**
- 서브: "랜딩&홈페이지 제작 · 광고 운영 · 검색 상단 노출 · 맞춤형 웹 솔루션"
- 헤드라인 (2줄): "문의로 이어지는 홈페이지를 만듭니다"
- 서브카피: "홈페이지 제작부터 광고 연동·운영 관리까지 / 단순 제작이 아닌 문의 구조까지 설계합니다"
- 버튼 3개 (파란색, 그림자): 무료 진단 신청(`/diagnosis`) / 성공 사례 보기(`/cases`) / WEFLOW 랜딩 페이지(`/landing`)
- 태그 박스 3개: 케어 플랜(제작·광고·운영) / 빠른제작(3일~7일) / 합리적 비용

**케어 플랜 혜택** (6칸 카드)
weflow 케어플랜 / 제작+운영+광고+관리 원터치 / 빠른 제작(3~7일) / 합리적인 가성비 / 24시간 상담대기 / 운영·광고 지원
하단 플로우: 고객의뢰 → 접수 후 제작 → 3~7일 배송완료 → 사후 관리

**성공사례 섹션**
- 좌: 텍스트 + "살펴보기 →" → `/diagnosis`
- 우: 이미지 5개 + 더보기

**제작 진행 과정 + 6단계 프로세스** (좌우 나란히)
- 좌 (4칸): 고객 상담 → 협의 후 제작 → 3~7일 완료 → 사후 관리
- 우 (6칸): 01 상담·진단 ~ 06 광고운영·사후관리

**무료진단 섹션**
✓ 4개 체크리스트 + "무료진단 후 견적 받기" → `/diagnosis`

**후기 슬라이더**
- 25개+ 후기, 2줄 자동 슬라이드
- "후기 더보기 →" → `/diagnosis`

---

### `/service` — 서비스
- 01~06 제작진행과정 (상세 설명)
- 광고 운영·사후관리 시스템 카드 8개

---

### `/plan` — 제작플랜 & 가격안내

**제작 플랜** (세로 카드 3개, 택1, ✓ 표시)
- START: ~~498,000~~ → **249,000원** / VAT 포함
- GROW: ~~1,980,000~~ → **990,000원** / VAT 포함
- MASTER 👑 (색상 강조): ~~2,980,000~~ → **1,490,000원** / VAT 포함

**케어 플랜** (세로 카드 3개, 택1)
- WE CARE: ~~170,000~~ → **89,000원~/월** / VAT 포함
- FLOW CARE: ~~378,000~~ → **189,000원~/월** / VAT 포함
- WEFLOW CARE 👑 (색상 강조): ~~678,000~~ → **339,000원~/월** / VAT 포함

**광고 세팅**
- 네이버 키워드: ~~298,000~~ → **149,000원~** / VAT 포함
- 당근 플레이스: ~~158,000~~ → **79,000원~** / VAT 포함

하단 안내문구 (도메인 별도, 광고비 직접 결제 등) 전부 표기

---

### `/cases` — 성공사례
- 1열 4개 카드형, center 정렬, 양옆 여백
- 카드: 상단 이미지 + 하단 상호명 + 자세히보기
- 클릭 → 해당 사례 상세 (참고: https://weflow-ten.vercel.app/cases)
- "더보기 →" → `/diagnosis`
- 업종 28개: PT샵, 필라테스, 헬스장, 보험설계, 법률사무소, 자동차 디테일링, 렌터카 업체, 웨딩/스냅 업체, 세무사사무소, 공인중개사, 카페, 미용실, 네일샵, 소상공인 기업형 홈페이지, 피부관리샵, 왁싱샵, 반영구샵, 애견미용, 반려동물 용품점, 인테리어 업체, 이사 업체, 키즈카페, 스터디카페, 영어학원, 수학학원, 입시학원, 개인과외, 청소업체

---

### `/reservation` — 예약
- 달력 (세로형)
- 시간대: 9:00~18:30, 30분 간격, 20개 (5×4 그리드), 현재 시간 이전 비활성화
- 직접 입력 칸
- 폼: 이름 / 연락처 / 제작종류(드롭다운 `ServiceType`) / 업종 / 추가요청사항 / ☑ 동의
- 제출 → `reservations` insert → 관리자 실시간 반영

---

### `/diagnosis` — 무료진단
- `DiagnosisForm` 컴포넌트 사용
- 폼: 이름 / 연락처 / 제작종류(드롭다운) / 업종 / 추가요청사항 / ☑ 동의
- "무료진단 후 견적받기" → `inquiries` insert → 관리자 실시간 반영

---

### `/landing` — 랜딩페이지
**레이아웃**: 좌측 콘텐츠 + 우측 `DiagnosisForm` sticky (스크롤 연동)

**좌측 순서**:
1. 메인 카피 + 버튼 2개 (우측 폼 포커스)
2. WEFLOW CARE PLAN 카드 5개
3. 중간 카피 + 문의 증가 구조 3항목
4. 가격 카드 8개 (`/plan` 동일)
5. 제작진행과정 (`/service` 동일)
6. 무료진단 섹션 → `/diagnosis`
7. 후기 슬라이더 전부

---

### `/admin` — 관리자 대시보드
**로그인**: `badeagle85@gmail.com` / `1111`
미인증 시 `/admin/login` 리다이렉트

**상단**: CASE 수정 / 전체 엑셀 다운로드 / 새로고침 / 로그아웃

**상태 필터**: 대기 / 진행중 / 완료 / 전체

**예약 관리 테이블**
컬럼: 상태 / 이름 / 연락처 / 접수일 / 희망일정 / 관리(완료·진행중·삭제) / ▼
▼ 클릭 → 제작종류 / 업종 / 추가요청사항 펼침
엑셀 다운로드 (예약 전체)
Supabase Realtime 구독 (`useAdminTable` 훅)

**문의 관리 테이블**
컬럼: 상태 / 이름 / 연락처 / 접수일 / 관리(완료·진행중·삭제) / ▼
▼ 클릭 → 제작종류 / 업종 / 추가요청사항 펼침
엑셀 다운로드 (문의 전체)

---

## 버튼/링크 라우팅 전체

| 위치 | 버튼 | 이동 |
|------|------|------|
| 홈 배너 | 무료 진단 신청 | `/diagnosis` |
| 홈 배너 | 성공 사례 보기 | `/cases` |
| 홈 배너 | WEFLOW 랜딩 페이지 | `/landing` |
| 홈 성공사례 | 살펴보기 → | `/diagnosis` |
| 홈 무료진단 | 무료진단 후 견적 받기 | `/diagnosis` |
| 홈 후기 | 후기 더보기 → | `/diagnosis` |
| 성공사례 | 카드 / 자세히 보기 | 사례 상세 |
| 성공사례 | 더보기 → | `/diagnosis` |
| 랜딩 상단 | 무료 진단 후 견적받기 → | 우측 폼 포커스 |
| 랜딩 상단 | 실제 제작 성공 보기 → | 우측 폼 포커스 |
| 랜딩 하단 | 무료진단 후 견적받기 → | `/diagnosis` |
| 플로팅바 | 24시간 상담 | `tel:010-2971-7280` |
| 플로팅바 | 카카오톡 문의 | `http://pf.kakao.com/_xntCbX` |
| 플로팅바 | 블로그 | `https://m.blog.naver.com/weflowlab` |
| 플로팅바 | 무료진단 | `/diagnosis` |

---

## Playwright 설정 (playwright.config.ts)

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,       // 관리자 상태 테스트 순서 보장
  retries: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
  },
})
```

---

## 전역 주의사항

1. **병원·의료기술 관련 내용 절대 삽입 금지**
2. TypeScript strict, `any` 금지
3. 모든 폼 → Supabase insert → 관리자 실시간 반영
4. 관리자 버튼 클릭 → 즉시 DB update
5. 반응형 필수, 글자·이미지 잘림 없음
6. FloatingBar 모든 페이지 노출 (layout.tsx에서 처리)
7. 드롭다운 제작종류 `ServiceType` 타입 사용
8. 예약 시간: 현재 시간 이전 비활성화
9. 엑셀 다운로드: 예약 단독 / 문의 단독 / 전체 통합 3종
10. `DiagnosisForm` 컴포넌트 `/diagnosis`, `/landing` 공용