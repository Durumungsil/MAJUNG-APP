# 마중(MAJUNG) AGENTS.md

마중(MAJUNG)은 그룹 여행 멤버들의 조건(예산·취향·알레르기 등)을 **익명으로 취합**하고, **교집합 연산**으로 여행지를 자동 확정해주는 여행 의사결정·일정 조율 서비스임. 확정에서 끝나지 않고 **이동 과정을 게이미피케이션(스토리 / 모험 / 익스트림 등 다중 모드)으로 콘텐츠화**하는 게 핵심 컨셉임. 이름처럼 "먼저 나가서 맞이하는" 따뜻한 경험을 지향함.

**응답과 설명은 한국어로 작성할 것.** (코드 식별자, 명령어, 파일 경로는 원문 그대로)

---

> ## 모든 작업 시작 전에 먼저 읽을 것
>
> 1. **§7 Directory Architecture(FSD)를 읽고** 코드 작성 전에 레이어·슬라이스·세그먼트를 정할 것
> 2. **UI 구현 전에 Figma 디자인을 읽을 것** — 디자인 값을 추측하거나 하드코딩하지 말 것
> 3. **새 패키지 설치 전에 `package.json`의 정확한 버전을 확인할 것**
> 4. **§8 도메인 규칙(익명성)은 모든 기능 작업에 우선 적용됨**
> 5. **작업 완료 보고 전에 품질 게이트(§5) 실행**: typecheck + lint + format check 통과 필수
> 6. **이 프로젝트는 Next.js 16임.** 학습 데이터 속 Next.js와 API·컨벤션이 다를 수 있으니, Next 관련 코드를 쓰기 전에 `node_modules/next/dist/docs/`의 해당 문서를 먼저 확인할 것 (예: `middleware.ts` → `proxy.ts`로 이름이 바뀜)

---

# 1. Platform Principles

- 타깃: **모바일 우선 웹앱**. **디자인은 모바일 화면만 존재함.** 모든 화면을 Figma 모바일 프레임 기준으로 구현하고, 데스크톱용 레이아웃을 임의로 설계하지 말 것
- 데스크톱 브라우저에서는 모바일 폭 컨테이너(폰 프레임 느낌)를 중앙에 두고, **컨테이너 바깥 배경은 연한 하늘색**으로 앱 화면과 구별되게 함. 색은 **Figma 팔레트의 연한 하늘색 토큰**을 쓰고, 마땅한 색이 없으면 임의로 만들지 말고 질문
- iOS Safari / Android Chrome 양쪽에서 동일하게 보여야 함. `100vh` 대신 `dvh`, 노치/홈 인디케이터는 `env(safe-area-inset-*)` 고려
- 서버 컴포넌트가 기본. 상호작용·브라우저 API·훅이 필요한 말단에만 `"use client"`를 붙임

---

# 2. Tech Stack

> 정확한 버전은 `package.json`에서 확인. 확인 없이 업그레이드 금지.

**설치됨**: `next` 16 (App Router) · `react` 19 · `typescript` 5 (`strict`) · `tailwindcss` **v4** (`@tailwindcss/postcss`, `tailwind.config.*` 없음) · `eslint` 9 flat config + `eslint-plugin-boundaries` · `prettier` · `husky` + `lint-staged` · `next/image` · `next/font/local` · `pnpm`

**사용하기로 결정됨, 아직 미설치** (처음 필요한 작업에서 **사용자에게 알리고 확인받은 뒤** 설치): `@tanstack/react-query` v5 · `zustand` · `@supabase/supabase-js` + `@supabase/ssr`

---

# 3. Package & Dependency Rules

- **`pnpm`만 사용.** `npm`/`yarn`/`bun` 금지. `package-lock.json`·`yarn.lock`이 생기면 **삭제하고 사용자에게 알릴 것**
- 추가: `pnpm add <package>` / `pnpm add -D <package>`
- 설치 스크립트가 필요한 패키지는 `pnpm-workspace.yaml`의 `allowBuilds`에 승인해야 함. 새 항목 승인은 사용자에게 먼저 확인
- `package.json`에 없거나 §2에 없는 의존성은 **추가 전에 질문**. 버전 업그레이드는 허락 없이 금지. 충돌이 나면 `--force` 없이 보고 후 질문

---

# 4. Environment Variables

- `.env.example`은 템플릿, `.env.local`에 실제 값. **실제 시크릿은 저장소에 포함하지 말 것**
- ⚠️ 현재 `.gitignore`가 `.env*`를 전부 무시함. `.env.example`을 처음 만들 때 `!.env.example` 예외를 추가해야 함
- `NEXT_PUBLIC_` 값은 번들에 포함되어 **누구나 볼 수 있음** → 시크릿·서버 전용 키 금지
- Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`만 클라이언트 노출 가능. **`service_role` 키는 `NEXT_PUBLIC_`를 붙이거나 클라이언트 코드에서 import하지 말 것** (RLS를 전부 우회함)
- 환경 변수 읽기는 `src/shared/config/`에 모을 것. 컴포넌트에서 `process.env` 직접 접근 금지
- 새 키를 추가하면 같은 변경에서 `.env.example`에도 placeholder로 추가

---

# 5. Code Quality Gate

작업 완료 보고 전에 **직접 실행하고 결과를 사실대로 보고**할 것:

```bash
pnpm exec tsc --noEmit   # typecheck 스크립트 없음
pnpm lint                # FSD 경계 위반 포함
pnpm format:check
```

- 고칠 때는 `pnpm lint:fix`, `pnpm format`. **`eslint-disable`로 경계 규칙을 끄지 말 것** — 구조를 고쳐서 해결
- pre-commit 훅이 있어도 의존하지 말고 위 명령을 직접 실행
- UI 변경은 **모바일 뷰포트에서 확인**하고, 실제로 확인한 환경만 보고. 실행하지 못했으면 검증했다고 말하지 말 것
- 테스트 프레임워크는 임의로 추가 금지. 대신 **교집합 연산·점수 계산·필터링·추천 순위·게임 판정 같은 로직은 슬라이스 `lib/`의 순수 함수**로 분리 (JSX·`useEffect` 안에 비즈니스 로직 금지)
- GitHub Actions CI는 없고, PR 리뷰는 CodeRabbit이 자동 수행함

---

# 6. Design System

> **모든 디자인 값(색, 간격, 타이포, radius 등)은 Figma에서 읽을 것.** 추측·하드코딩 금지.

- Tailwind v4라 토큰은 **CSS `@theme` 한 곳**에만 정의 (`src/app/styles/`). 컴포넌트는 `bg-<token>`, `text-<token>` 같은 클래스로만 사용. 토큰이 없으면 **Figma에서 읽어 `@theme`에 먼저 추가**한 뒤 사용
- **컬러 팔레트는 Figma에 이미 전부 등록돼 있음.** 새로 정하지 말고 옮겨 쓰며, 팔레트에 없는 색은 질문
- **Light mode only.** Figma에 다크 팔레트가 없으므로 `dark:` 변형·테마 토글 금지
- 현재 `app/globals.css`, `app/layout.tsx`, `app/page.tsx`는 create-next-app 템플릿 상태임 (Geist 폰트, `dark:` 클래스, 하드코딩 색 포함). **템플릿 값을 따라 하지 말고** 정리 대상으로 볼 것
- 마중은 **기억에 남는 컨셉**이 목표임. 임의로 "무난한 SaaS 스타일"로 바꾸지 말 것
- UI 문구는 **Figma 또는 팀 확정 문구**만 사용. 캐릭터/화자 설정은 없으므로 특정 인격으로 말하는 문구를 만들지 말 것

## 폰트 2종

| Font           | 용도                                 | 변수 / 클래스                 |
| -------------- | ------------------------------------ | ----------------------------- |
| `Ok Mallang B` | **제목, 강조 문구**                  | `--font-title` / `font-title` |
| `LeeSeoyun`    | **기본 본문** (설명, 버튼, 폼, 기타) | `--font-body` / `font-body`   |

- 이 2개 외 폰트 금지 (템플릿의 Geist는 제거 대상)
- **로고는 폰트가 아니라 Figma 이미지 에셋**으로 가져와 컴포넌트로 감싸서 사용 (로고 폰트를 따로 로드하지 말 것)
- 파일은 `src/shared/assets/fonts/`, `next/font/local`로 **`app/layout.tsx`에서 한 번만** 로드. **파일명에 공백 금지** (`OkMallangB-Regular.ttf` ✅)
- **폰트 토큰은 `@theme inline`으로 선언할 것.** 예: `@theme inline { --font-body: var(--font-lee-seoyun); }`. 일반 `@theme`에 `var()`로 연결하면 `next/font` 변수가 안쪽 요소에 걸려 있을 때 값이 안 풀려 시스템 폰트로 조용히 폴백됨. `next/font`의 `variable` 이름과 `--font-*` 참조도 같은 이름이어야 함
- weight 파일이 따로 없으면 `font-bold`로 굵기를 흉내내지 말 것. 강조는 **폰트 패밀리를 바꿔서** 표현
- 폰트 크기는 Figma 텍스트 스타일에서 만든 `--text-*` 토큰 사용. `text-[13px]` 금지
- `Ok Mallang B`는 인스턴스마다 **크기와 외곽선(stroke) 유무가 다를 수 있음.** 쓸 때마다 해당 노드의 크기·stroke를 확인 (Figma 코드 추출은 stroke를 누락하므로 스크린샷도 확인). 같은 조합이 2곳 이상이면 이름 붙은 토큰으로 승격

## Figma 사용 규칙

- 화면/컴포넌트 구현 전에 **항상 Figma를 먼저 읽을 것.** Figma MCP가 인증되지 않았으면 디자인 값을 추측하지 말고 인증을 요청
- **File Key는 사용자가 준 Figma 링크에서만** 가져오고, 링크가 없으면 먼저 물어볼 것. 어디에도 하드코딩 금지
- 아이콘 패키지 설치 금지, placeholder 에셋 금지 — **Figma 실제 에셋만** 사용. 모든 이미지·SVG는 React 컴포넌트로 감싸서 사용 (`src/shared/assets/`), 비트맵은 `next/image`
- Figma 디자인이 없는 컴포넌트는 **진행 전에 질문**

---

# 7. Directory Architecture — Feature-Sliced Design (FSD)

> 승인 없이 새 레이어·최상위 디렉터리를 만들지 말 것. 슬라이스·세그먼트는 **처음 필요해질 때** 만들 것 (빈 폴더 미리 만들기 금지).

```
majung-frontend/
├── app/                  # ★ Next.js App Router. 라우트 파일은 여기에만. 얇게 유지 (views 렌더만)
├── src/
│   ├── app/              # FSD app 레이어 (라우트 아님!): providers/, styles/(@theme)
│   ├── views/            # 화면 단위 조합 (FSD의 pages. Next pages/와 충돌을 피해 views로 명명)
│   ├── widgets/          # 여러 기능을 묶은 큰 UI 블록
│   ├── features/         # 사용자 행동 단위 (예: submit-survey, decide-destination)
│   ├── entities/         # 도메인 엔티티 (예: user, group, survey, place, journey)
│   └── shared/           # 도메인 무관 공용. 슬라이스 없이 세그먼트만:
│                         #   api/(supabase, query-client) assets/ config/ lib/ model/ ui/
├── public/
├── proxy.ts              # (필요 시) Next 16의 구 middleware. 프로젝트 루트에 둠
└── eslint.config.mjs     # FSD 경계 규칙 포함
```

## ⚠️ `app/` vs `src/app/`

- **루트 `app/`** = Next.js 라우터. `page.tsx`, `layout.tsx`, `route.ts`는 **여기에만**
- **`src/app/`** = FSD app 레이어. **여기에 `page.tsx`/`layout.tsx`를 두지 말 것**
- 루트 `app/`을 삭제·이동하면 Next가 `src/app/`을 라우터로 잡아서 **앱이 깨짐**
- 라우트 경로는 공유 링크(초대 링크 등)의 **공개 계약**임. 이름 변경 전에 알릴 것

## 의존 규칙 (ESLint `boundaries`로 강제)

레이어 순서(위 → 아래): `app` → `views` → `widgets` → `features` → `entities` → `shared`

- 각 레이어는 **자기보다 아래 레이어**와 **같은 슬라이스 내부**만 import 가능. 루트 `app/`과 `src/app`은 모든 레이어 import 가능. `shared`는 `shared`만
- **같은 레이어의 다른 슬라이스끼리 import 금지** (예: `features/a` → `features/b` ❌), 위로 올라가는 import도 금지
- 마중은 `group`↔`user`, `survey`↔`group`처럼 엔티티가 서로 얽히기 쉬움. 경계에 막히면 **`eslint-disable`로 우회하지 말고 아래 순서로 해결**:
  1. **위 레이어에서 조합**: 두 슬라이스를 `widgets`/`views`(또는 상위 `features`)에서 함께 사용하고, 데이터는 props로 넘김
  2. **공용 타입만 아래로 내림**: ID, 기본 타입처럼 도메인 로직이 없는 것은 `shared/model/`로 이동
  3. 그래도 안 풀리면 구조를 임의로 바꾸지 말고 **사용자에게 질문**

## 세그먼트와 Public API

| 세그먼트   | 내용                                                  |
| ---------- | ----------------------------------------------------- |
| `ui/`      | 컴포넌트                                              |
| `model/`   | 타입, Zustand store, 상태 훅                          |
| `api/`     | Supabase 요청 함수, `query-keys.ts`, 쿼리/뮤테이션 훅 |
| `lib/`     | **순수 비즈니스 로직** (테스트 가능)                  |
| `config/`  | 슬라이스 전용 상수                                    |
| `index.ts` | **public API.** 슬라이스 밖에서 쓰는 것만 re-export   |

- 슬라이스 밖에서는 **`index.ts`로만 import** (`@/features/submit-survey` ✅, `@/features/submit-survey/model/store` ❌)
- Alias는 `@/*` → `./src/*`. **`@/` 절대 경로만** 사용하고 `../../`로 슬라이스 밖에 나가지 말 것. 루트 `app/` 라우트에서는 `@/views/...`, `@/app/providers/...`를 import
- 재사용 UI는 `src/shared/ui/`에서 **이미 있는지 확인한 뒤** 만들 것 (중복 금지)

---

# 8. 도메인 규칙 — 익명성과 민감 정보 (최우선)

마중의 핵심 가치는 **"눈치 보지 않는 의사결정"**임. 익명성이 깨지면 서비스의 존재 이유가 사라짐.

- **개별 멤버의 설문 응답을 다른 멤버에게 노출하는 UI·API·로그·에러 메시지를 만들지 말 것.** 화면에는 **교집합 결과**와 집계 정보만 표시
- "누가 어떤 조건을 냈는지" 추론 가능한 표시 금지 (멤버 수가 적을 때 역추적할 수 있는 통계 포함)
- **알레르기·못 먹는 음식 등 민감 정보**는 localStorage에 영구 저장 금지. 임시 저장은 메모리(Zustand) 또는 sessionStorage까지만
- 설문 응답 원문을 `console.log`, 에러 리포트, 분석 이벤트, URL query에 넣지 말 것
- 결과 화면은 **확정 장소 + 교집합으로 설명 가능한 근거**만 보여주고, 특정 멤버를 지목하지 않음
- 특정 업체를 우선 노출하는 광고성 로직·가중치 금지. 추천 기준은 **그룹 멤버 조건**뿐 (중립성이 차별점)
- 게이미피케이션 모드의 세부 규칙·연출은 **Figma와 팀 확정본**을 따름. 임의로 게임 규칙을 만들지 말 것

---

# 9. Data Fetching & State

- **QueryClient**: 생성 함수는 `src/shared/api/query-client.ts`, `src/app/providers/query-provider.tsx`(Client Component)에서 **`useState`로 한 번만 생성**해 루트 `app/layout.tsx`에 마운트. **모듈 최상단 전역 인스턴스 금지** (서버에서 요청 간 캐시가 공유될 수 있음)
- Query key는 슬라이스의 `api/query-keys.ts` 팩토리에서만 가져옴. 서버 접근은 모두 `api/` 세그먼트를 통하고, 컴포넌트에서 Supabase/HTTP를 직접 호출하지 말 것. `useEffect + useState` fetching 금지
- **Zustand**는 UI 상태·설문 진행 단계·게임 진행 상태 등 **브라우저에서만 의미 있는 상태**에만 사용. **서버 데이터를 복제하지 말 것** (서버 데이터는 TanStack Query가 단일 출처). store는 슬라이스 `model/`에 두고 Client Component에서만 사용. 민감 정보(§8)를 `persist`하지 말 것
- 모든 화면은 **loading / error / empty**를 처리해야 함: 레이아웃을 닮은 Skeleton(전체 화면 스피너 금지), 재시도 가능한 ErrorState, Figma 문구의 EmptyState. 성공 경로만 처리한 화면은 미완성
- Mutation 진행 상태는 **트리거한 버튼에** 표시하고 전체 화면을 막지 말 것. 성공/실패 피드백은 **toast** (자체 구현, 라이브러리는 추가 전 질문). `alert()`/`confirm()`은 파괴적 작업 확인에만
- **서버 원문 메시지·스택·HTTP 상태 코드를 사용자에게 보여주지 말 것.** `src/shared/config/error-messages.ts`의 한국어 문구로 매핑
- 위치 정보 같은 브라우저 권한은 **의미 있는 시점에 요청**하고 첫 진입에서 요청하지 말 것

---

# 10. Supabase, Auth & API

- Supabase 클라이언트 생성은 `src/shared/api/supabase/`에서만 (브라우저용 / 서버용 분리). 컴포넌트에서 `createClient` 직접 호출 금지
- 세션 갱신이 필요하면 **루트 `proxy.ts`** 사용 (`middleware.ts` 아님). 작성 전 `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md` 확인
- **모든 테이블에 RLS를 켤 것.** RLS 없는 테이블, anon 키로 전체 읽기 허용 금지
- 익명성은 **UI가 아니라 DB 레벨에서 보장**: 클라이언트가 다른 멤버의 개별 응답 row를 조회할 수 있는 정책·쿼리·뷰를 만들지 말 것. 교집합 결과만 읽을 수 있게 설계 (서버 함수/RPC/Edge Function 등)
- 스키마 변경(테이블, 컬럼, 정책)은 **먼저 설명하고 확인**받은 뒤 진행. DB 타입은 생성 타입 사용(`any` 금지), 생성 파일은 직접 수정 금지
- **로그인은 필수.** 인증은 **Supabase Auth의 Google OAuth만** 사용 (확정). 다른 로그인 방식을 임의로 추가 금지. 별도 회원가입 화면은 없고, 구글로 처음 로그인하면 계정이 자동 생성됨
- OAuth 시크릿은 **Supabase 대시보드에서만** 설정. redirect URL은 하드코딩하지 말고 환경에 따라 바뀌게 구성. 세션/토큰은 Supabase 방식을 따르고 직접 꺼내 저장하지 말 것
- 비로그인 상태로 **초대 링크**에 진입하면 로그인 후 원래 초대 링크로 돌아오는 흐름이 필요함 (화면은 Figma 기준). 초대 링크에는 **예측 가능한 순차 ID 금지**, 예측 불가능한 토큰 사용
- 로그인 사용자 id와 설문 응답의 연결은 **DB 내부에서만** 존재해야 함 (§8)
- 외부 장소 API는 교체될 수 있으므로 그 응답 형태를 UI·로직에 직접 쓰지 말고, 우리 쪽 `Place` 타입(`src/entities/place/model/`)으로 변환하는 어댑터를 `src/entities/place/api/` **한 곳**에 두고 거쳐서 사용
- 스펙에 없는 엔드포인트·테이블은 추측하지 말고 질문

---

# 11. Coding Rules

- 함수형 컴포넌트 + 명시적 TypeScript 타입. 컴포넌트는 `export default function Name() {}` (슬라이스 `index.ts`에서는 `export { default as Name } from "./ui/name"`). React 19이므로 새 코드에서 `forwardRef` 지양
- 파일·폴더명은 kebab-case. 스타일은 **Tailwind `className`** (`style={{}}` 지양, 동적 값처럼 불가피할 때만 이유를 주석으로)
- 이벤트 핸들러는 이름 있는 함수 `handle{Target}{Event}`. 인라인 함수 지양
- `any` 금지. 컴포넌트가 150줄을 넘으면 훅/컴포넌트로 분리. `import { useState } from "react"`처럼 직접 import (`React.xxx` 금지)
- `console.log`를 남기지 말 것. 기존 주석·docstring은 삭제하지 말 것
- `src/app/`에 라우트 파일 금지. FSD 경계 위반(상위 import, 같은 레이어 다른 슬라이스 import, public API 우회) 금지

---

# 12. Git — 에이전트는 커밋하지 않음

- **에이전트는 저장소 상태를 바꾸는 git 명령을 실행하지 말 것.** `add`, `commit`, `push`, `stash`, `reset`, `checkout`/`switch`(브랜치 생성·전환), `merge`, `rebase` 등은 **사용자가 명시적으로 요청하지 않는 한 금지**
- **커밋은 항상 사용자가 직접 함.** 작업이 끝나면 변경 파일 목록과 요약만 알리고 멈출 것. `git status`/`diff`/`log` 같은 읽기 전용 명령은 사용 가능
- 커밋 메시지는 사용자가 제안을 요청할 때만 제안하고, 아래 컨벤션(`README.md` 기준)을 따름
  - 브랜치: `타입/jira번호` (예: `feat/MAJ-1`)
  - 커밋: `타입(jira번호) :: 변경 사항 요약` (예: `chore(MAJ-1) :: 커밋 컨벤션 추가`), 제목 50자 이내
  - 타입: `feat`, `fix`, `refactor`, `test`, `chore`, `docs`, `delete`, `build`
  - PR은 `.github/pull_request_template.md` 양식을 따름
