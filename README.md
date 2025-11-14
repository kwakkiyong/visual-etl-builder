# Visual ETL Builder

비주얼 데이터 파이프라인 빌더 - 드래그 앤 드롭으로 ETL 파이프라인을 시각적으로 구성하고 실행할 수 있는 웹 애플리케이션입니다.

## 🎯 프로젝트 개요

이 프로젝트는 React 19 기반의 모던 프론트엔드 기술 스택을 활용하여, Airflow, AWS Glue Studio, Databricks Flow와 유사한 비주얼 파이프라인 빌더를 구현합니다.

## 🛠️ 기술 스택

- **React 19** - 최신 React 기능 활용 (Transition, Suspense, Server Actions 등)
- **TypeScript** - 타입 안정성 보장
- **Vite** - 빠른 개발 환경 및 빌드
- **Tailwind CSS** - 유틸리티 기반 스타일링
- **Zustand** - 경량 상태 관리
- **React Router** - 클라이언트 사이드 라우팅
- **React Flow** - 노드 기반 그래프 시각화
- **Zod** - 스키마 검증
- **Axios** - HTTP 클라이언트
- **Lucide React** - 아이콘 라이브러리

## 📁 프로젝트 구조

```
src/
├── api/              # API 클라이언트
│   └── pipeline.ts
├── components/       # 재사용 가능한 컴포넌트
│   ├── ui/          # 기본 UI 컴포넌트 (Button, Input, Sheet 등)
│   ├── Node.tsx     # 노드 컴포넌트
│   ├── NodePalette.tsx
│   ├── NodeConfigPanel.tsx
│   └── Layout.tsx
├── features/         # 기능별 모듈
│   └── pipeline-editor/
│       ├── PipelineCanvas.tsx
│       └── usePipelineStore.ts
├── lib/             # 유틸리티 및 스키마
│   ├── utils.ts
│   └── schema.ts
├── pages/           # 페이지 컴포넌트
│   ├── Dashboard.tsx
│   ├── PipelineList.tsx
│   ├── PipelineEditor.tsx
│   └── RunHistory.tsx
├── App.tsx          # 메인 앱 컴포넌트
└── main.tsx         # 진입점
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+ 
- pnpm (권장)

### 설치

```bash
# pnpm 설치 (아직 설치하지 않은 경우)
npm install -g pnpm

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 빌드 미리보기
pnpm preview

# 코드 포맷팅
pnpm format

# 코드 포맷팅 확인
pnpm format:check

# ESLint 실행
pnpm lint

# ESLint 자동 수정
pnpm lint:fix
```

## 🛠️ 개발 도구

### Prettier
코드 포맷팅을 자동으로 적용합니다.

```bash
# 모든 파일 포맷팅
pnpm format

# 포맷팅 확인 (CI/CD용)
pnpm format:check
```

### ESLint
코드 품질과 스타일을 검사합니다.

```bash
# 린트 검사
pnpm lint

# 자동 수정 가능한 문제 수정
pnpm lint:fix
```

### IDE 설정

#### IntelliJ IDEA / WebStorm
프로젝트에 포함된 `.idea` 설정으로 다음 기능이 자동 활성화됩니다:
- Prettier 플러그인 설치 시 저장 시 자동 포맷팅
- ESLint 플러그인 설치 시 저장 시 자동 수정
- EditorConfig 지원 (`.editorconfig` 파일)

**설정 방법:**
1. Prettier 플러그인 설치: `Settings` → `Plugins` → `Prettier` 검색 후 설치
2. ESLint 플러그인 설치: `Settings` → `Plugins` → `ESLint` 검색 후 설치
3. Prettier 설정: `Settings` → `Languages & Frameworks` → `JavaScript` → `Prettier`
   - Prettier package: `$PROJECT_DIR$/node_modules/prettier`
   - Run on save: 체크
4. ESLint 설정: `Settings` → `Languages & Frameworks` → `JavaScript` → `Code Quality Tools` → `ESLint`
   - Automatic ESLint configuration: 체크

#### VS Code
프로젝트에 포함된 `.vscode/settings.json`으로 다음 기능이 자동 활성화됩니다:
- 저장 시 자동 포맷팅
- 저장 시 ESLint 자동 수정
- Prettier를 기본 포맷터로 사용

## ✨ 주요 기능

### 1. 파이프라인 빌더
- 드래그 앤 드롭으로 노드 추가
- 노드 간 연결로 DAG(Directed Acyclic Graph) 구성
- 노드 클릭 시 설정 패널 표시
- Canvas 줌/팬 기능

### 2. 노드 타입
- **Source Nodes**: File, Database, API
- **Transform Nodes**: Filter, Map, Aggregate
- **Load Nodes**: Save to DB, Save to File

### 3. 파이프라인 관리
- 파이프라인 저장/불러오기
- 파이프라인 목록 조회
- 파이프라인 편집

### 4. 실행 및 모니터링
- 파이프라인 실행
- 실행 이력 조회
- 실행 로그 확인

## 📝 개발 가이드

### 상태 관리

Zustand를 사용하여 파이프라인 상태를 관리합니다:

```typescript
import { usePipelineStore } from "@/features/pipeline-editor/usePipelineStore"

const { nodes, edges, addNode, updateNode } = usePipelineStore()
```

### 타입 정의

모든 타입은 Zod 스키마로 정의되어 있으며, `src/lib/schema.ts`에서 확인할 수 있습니다.

### API 연동

API 클라이언트는 `src/api/pipeline.ts`에 정의되어 있습니다. 현재는 목업 데이터를 사용하며, 실제 백엔드 연동 시 해당 함수들을 구현하면 됩니다.

## 🔮 향후 계획

### Lv.1 (현재)
- ✅ 기본 노드 타입 (Source, Transform, Load)
- ✅ 노드 연결 및 삭제
- ✅ 설정 패널
- ✅ localStorage 기반 저장/불러오기

### Lv.2
- [ ] 미니맵
- [ ] 노드 이동 애니메이션
- [ ] Canvas zoom/pan 개선

### Lv.3
- [ ] 백엔드 API 연동
- [ ] 실행 이력 관리
- [ ] 사용자/팀 공유 기능

### Lv.∞
- [ ] 실제 ETL 실행 엔진 연동
- [ ] OpenAI API를 활용한 Transform Node 자동 생성
