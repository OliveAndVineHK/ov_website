# REVIEW_QUEUE — 사용자 확인 대기 항목

> 불확실하거나 브랜딩 판단이 필요한 건을 모은다. 확인·반영되면 `[x]` 표시 또는 항목 제거.
> 형식: 파일:라인 (유형) / 현재값 / 제안 / 사유

---

## pageAboutUtils.ts — 모두 해결됨 (2026-06-03)

### [x] L26 leadershipLabel — `"주요 리더십"` **유지 확정**
- 결정: 섹션 구분 라벨이므로 '주요 리더십' 유지. (RULES 라벨 위계 규칙 참조)

### [x] L56 rebecca.career role — `"엔게이지먼트 리더"` → `"프로젝트 총괄"` **적용 완료**

### [x] L41 credentials — `"HKICPA (실무)"` **유지 확정**

### [x] career role — `"보증"`(Assurance) / `"기업 업무"`(Corporate Affairs) **유지 확정**

### [x] L105 stats — `"함께한 클라이언트"` **유지 확정** (브랜드 의도)

---

## 하드코딩 .tsx 페이지 — 확인 필요 (2026-06-03 2차)

### [x] 사이트 전반 인칭 일관성 — **해결(v6 규칙화)**
- 결정(사용자): 페이지별 적용 — 서비스·소개=`저희` / 가치·서사=`우리` / 메뉴 라벨 `우리의 X` 고정.
- 적용: corporate-service/page.tsx:186 `우리는`→`저희는`. (our-values 본문 '우리'는 서사 면이라 유지)

### [x] app/leadership/page.tsx : L99 히어로 헤딩 — **해결**
- 변경: `{isKo ? "주요 리더십" : ...}` → `{isKo ? "회사를 세운 사람들" : "The people who built this firm"}` (사용자 지정)

### [x] app/utils/pageLeadershipUtils.ts : L8 culture — **해결**
- 변경: `올리브앤바인은` → `Olive & Vine은` (브랜드명 영문 유지 규칙).

### [x] app/components/InsightCards.tsx : L191 'Amendment' — **해결**
- 변경: `{ ko: "수정" }` → `{ ko: "정관 변경" }` (정관 amendment 맥락 확인).
- ⚠️ 인사이트 작업 시 이월: `insights/corporate-service-amendment.ts` heroTitle ko `"수정"` 및 본문 '정관 수정'↔'정관 변경' 표기도 통일 검토 필요.

### [x] app/utils/pageServicesUtils.ts : services.corporate 법률 용어 — **해결**
- 적용: '회사 법정 비서'→'회사 비서', '회사 등록관'→'회사등기소', '회사 조례'→'회사법'(인사이트 일치).

### [ ] 사이트 전반: `Olive & Vine는` → `Olive & Vine은` (조사 오류)
- 위치: 인사이트 다수(예: corporate-service-corporate-secretary.ts:203), 기타 util 잔존 가능
- 결정: 'Vine'은 ㄴ받침 발음 → 조사 '은'이 문법상 정확. in-scope 파일은 '은'으로 교정 완료. **인사이트(별도 작업)에서 '는'→'은' 일괄 교정 필요.**

### [x] `Companies Ordinance` 표기 통일 — **해결**: `홍콩 회사법`(사용자 확정). pageServices·pageCorporate 적용 완료.

### [x] 'Assurance' 표기 — **해결**: 단일 한국어로 통일하지 않음(사용자). 'Assurance'는 그대로, 보증/인증 혼용 현행 유지.

<!-- 원본 메모 -->
### [x] (참고) 'Assurance' 표기: `보증` vs `인증` 혼용
- 위치: pageAssuranceServiceUtils — 타이틀/탭/태그는 `보증`(heroTitle, "기타 보증"), 본문 단락은 `인증 서비스`/`기타 인증 서비스` 사용
- 배경: 한국 회계업계 표준은 'Assurance=인증(업무)'에 가까움(예: 회계법인 '인증본부'). 반면 사이트 타이틀·글로서리는 사용자 확정 '보증'.
- 제안: ① 전부 `보증`으로 통일(타이틀 기준) ② 본문은 업계 표준 `인증` 유지하고 타이틀도 `인증`으로 통일 ③ 현행 혼용 유지
- 사유: 같은 페이지 내 보증/인증 혼재. 업계 관용 vs 사이트 일관성 판단 필요. **선호안?**

### [x] 브랜드 가치어 'Integrity' — **해결**: 기본 `정직성`(사용자), 서사·공감 문맥은 `진정성`(leadership '진실함' 유지), system integrity는 `무결성`. pageUtils 진정성→정직성(4곳) 적용.

<!-- 원본 메모 -->
### [x] (참고) 브랜드 가치어 'Integrity' 표기 통일
- 현황: `진정성`(pageUtils integrity/compliance, 홈), `정직성`(pageValues value①), `진실함`(pageLeadership culture), `정직`(pageAbout '정직으로 이끕니다')
- 글로서리: integrity = 원칙·정직
- 제안: 가치 라벨로서 하나 선택 — ① `정직성`(values 페이지 기준, honesty) ② `진정성`(홈 기준, authenticity) / 문맥상 'integrity of system'은 '무결성' 유지
- 사유: 핵심 브랜드 가치어가 4가지로 갈림. 통일 필요하나 영향 범위 넓어 사용자 확정 요청. **선호 라벨?**

### [ ] app/utils/dynamicPageConfig.ts — 인사이트 메타데이터(이월: 인사이트 작업)
- 인사이트 페이지 document title·breadcrumb. 인사이트 본문과 함께 통일 필요. 고칠 항목:
  - `insights/corporate-service/amendment`: '수정' → '정관 변경' (InsightCards와 일치)
  - `insights/hr/mandatory-provident-fund`: '강제적 공제 기금' → '법정 퇴직연금(MPF)' 등 표기 통일
  - 'Corporate Tax 법인세 및 신고', 'Two-Tiered Salaries Tax 이중 급여세' 등은 인사이트 heroTitle과 대조 확인

---

## 범위 밖 — 해결됨 (app/utils 외부)

### [x] app/leadership/page.tsx : L148 (유형: 섹션 eyebrow 라벨)
- 변경: `{isKo ? "공동 창업자" : "Co-founders"}` → `{isKo ? "주요 리더십" : "Our Leadership"}`
- 결정(사용자): 이 페이지 상단 초록색 라벨을 한국어 '주요 리더십' + 영문 'Our Leadership'으로 함께 변경. EN/KO 의미 일치.
