# TRANSLATION_LOG — 작업 로그

## 2026-06-03 / app/utils/pageAboutUtils.ts
- 페이지 구조: 회사소개(About). 히어로 → 브랜드 스토리 → 공동창업자 2인 소개(경력 타임라인 포함) → 3대 가치 기둥 → 통계 → CTA.
- 다듬은 문자열: 3개 (본문 3). 나머지 ~37개 한국어 value는 이미 품질 양호 → §2.2 과도한 손질 금지로 보존.
- 처리 내역:
  1. `storyBody` — §5 calque 'deserve=받을 자격이 있다' 제거, 펌의 신념으로 재구성. 'transactional↔transformational'을 '거래에 머물지 않고 함께 변화를 만들어 가는'으로 명확화. 'across continents' 누락 복원('여러 대륙에서').
  2. `rebecca.bio` — 'Big Four'→'빅4'(용어집), 'rigor 엄격함'→'엄정함'(용어집), '바탕으로' 중복 해소, 'three continents' 누락 복원('세 대륙 다섯 나라'). 'Big Four 수준의 ~을 제공합니다'→'갖추고 있습니다'(인물 자질 서술에 자연스러움).
  3. `leadershipCulture` — 영문 'advocate'(=든든한 지원군) 의미 누락 복원: 말미에 '든든한 힘이 되어 드리는' 추가.
- jargon 검증: 이번 파일은 confident 교정만 용어집 근거로 처리. assurance/Practising/engagement 직함은 미확정 → REVIEW_QUEUE.
- REVIEW_QUEUE로 넘긴 항목: 5건 (leadershipLabel, engagement 직함, Practising 표기, Assurance/Corporate Affairs 직함, 클라이언트/고객 일관성).
- 규칙 변동: 없음 (v4 유지). 용어집에 'Big Four→빅4', 'assurance/HKICPA Practising' 미확정 행 추가.

## 2026-06-03 (2차) / app/utils/pageAboutUtils.ts — REVIEW_QUEUE 사용자 회신 반영
- 적용: `엔게이지먼트 리더` → `프로젝트 총괄` (1건 추가 교정).
- 확정 유지: leadershipLabel '주요 리더십', HKICPA(실무), Assurance=보증, Corporate Affairs=기업 업무, stats '함께한 클라이언트'.
- 신규 규칙(v5): 리더십 라벨 위계 — 섹션 구분=`주요 리더십`, 개인 카드=`공동창업자`.
- 용어 확정: assurance=보증, Corporate Affairs=기업 업무, HKICPA Practising=실무, Engagement Leader=프로젝트 총괄.
- 범위 밖 처리(사용자 승인): app/leadership/page.tsx:148 eyebrow 라벨 '공동 창업자/Co-founders' → '주요 리더십/Our Leadership' (EN+KO 동시 변경). 라벨 위계 규칙(v5) 적용.

## 2026-06-03 (3차) / 하드코딩된 .tsx 페이지 일제 점검 + 교정
- 범위: app/utils 외 .tsx에 하드코딩된 한국어 전수 조사(grep). 인사이트 아티클 렌더러(insights/[tag]/[slug]/page.tsx), 월이름 데이터, 코드 주석은 제외.
- 발견: 대다수 서비스/소개/리더십 페이지 본문·헤딩은 이미 품질 양호 → §2.2로 보존. 실제 망가진 곳은 2개 파일.
- 교정 완료:
  1. components/ServiceCTA.tsx — 6개 서비스 CTA 전면 손질. 번역투 제거: '귀사'(인칭 흡수), '워크포스'→'조직', '준수 요구 사항'→'준법 의무', '독특한 과제'(unique 오역)→'고객마다 다른 과제', '거버넌스'→'지배구조'. 본문은 서술형 통일, 행동 유도는 버튼으로. heading '세금 전략'→'세무 전략', button '지금 강화'→'강화 시작'.
  2. contact/page.tsx — culture 문단(L45) 기계번역 전면 재작성('무결성/집단적 약속에 의해서만 동기 부여됩니다' 수동태 calque 제거, integrity=진실함으로 leadership culture와 보이스 일치). L37 '연락'→'문의', L53 '우리와 연결하세요'→'편하게 연락 주세요', L66 '말하기를 원하지 않음'→'밝히지 않음'.
  3. tax-service/page.tsx:477 — 캡션 '연차 보고…상이합니다'→'연례 보고 시기는 회사 설립일에 따라 달라집니다'.
  4. components/DynamicStatStrip.tsx:30 — '거버넌스 감사'→'지배구조 감사'(글로서리 일관성).
- REVIEW_QUEUE 신규 4건: 우리/저희 인칭 일관성(사이트 전반), leadership L96/99 EN-KO 불일치, pageLeadershipUtils '올리브앤바인' 브랜드 음차, InsightCards 'Amendment=수정'.
- 규칙 변동: 없음(v5 유지).

## 2026-06-03 (4차) / 인칭·헤딩 결정 반영
- 사용자 결정: 인칭 페이지별(서비스·소개=저희 / 가치·서사=우리 / 메뉴 라벨 '우리의 X' 고정) → RULES v6.
- 적용: corporate-service/page.tsx:186 '우리는'→'저희는'; leadership/page.tsx:99 헤딩 '주요 리더십'→'회사를 세운 사람들'.
- 미해결(REVIEW_QUEUE 잔여 2건): pageLeadershipUtils '올리브앤바인' 브랜드 음차, InsightCards 'Amendment=수정'(인사이트 작업과 함께 처리 예정).

## 2026-06-03 (5차) / 잔여 2건 처리
- pageLeadershipUtils.ts:8 culture: '올리브앤바인은' → 'Olive & Vine은' (브랜드 영문 통일).
- components/InsightCards.tsx:191: 'Amendment' ko '수정' → '정관 변경' (정관 amendment 맥락 확인).
- 글로서리 추가: Amendment(정관)=정관 변경, 브랜드 표기 'Olive & Vine'(& 사용) 명시.
- 이월(인사이트 작업): insights/corporate-service-amendment.ts heroTitle '수정' 및 본문 '정관 수정/변경' 표기 통일.

## 2026-06-03 (6차) / app/utils 페이지 카피 복귀 — pageValuesUtils.ts
- 구조: Values(우리의 가치). 히어로 → 미션 → 5대 가치(정직성·탁월성·파트너십·공감·성장, 각 title/statement/body) → 약속 → CTA.
- 품질 양호로 대부분 보존. 교정 2건:
  1. heroSubtitle — 한 문장 내 인칭 혼재('우리는…돌아옵니다 / 저희가…') → 본문 보이스 '저희'로 통일.
  2. value② body — 'Big Four'→'빅4', '엄격함'→'엄정함'(글로서리, pageAbout과 동일).
- 인칭: Values=서사 면이라 페이지명 라벨(우리의 가치/미션/약속)·히어로 슬로건(우리가 믿는 것)은 '우리' 유지. 1인칭 산문은 '저희'.
- 규칙 변동: 없음(v6).

## 2026-06-03 (7차) / pageServicesUtils.ts
- 구조: Services 페이지 — 인트로 description + 6개 서비스 설명(corporate/accounting/assurance/tax/service5/service6).
- 품질 갈림: assurance·tax는 이미 잘 다듬어져 보존. corporate는 정확한 법률 서술이라 보존(용어 검증만 REVIEW_QUEUE).
- 재작성 4건(옛 기계번역, '귀하/귀사' 범벅):
  1. description — 브랜드 'Olive & vine'→'Olive & Vine', 귀하/귀사 제거, 중복 해소, engagement→프로젝트.
  2. accounting — '제공' 3회 중복 해소, '사용자 친화적'→'보기 쉽고', more than→넘어.
  3. service5 — 귀하 제거, 'constructive results'→'의미 있는 성과', informed decisions 자연화.
  4. service6 — 'statutory benefits 법정 혜택'→'법정 복리후생', '프로세스'→'업무', 법규 정리.
- REVIEW_QUEUE 추가: corporate 법률 용어(회사 법정 비서/회사 등록관) 표준 표기 검증.

## 2026-06-03 (8차) / pageCorporateServiceUtils.ts
- 구조: Corporate Service. 히어로 → 회사 비서란?+불렛 → 주요 책임+불렛 → 생애주기 3단계(Start Up/In Business/Exit, 각 desc+불렛) → 디지털화 → intro → 인사이트 placeholder.
- 인사이트 확정 용어에 맞춰 교정(10건):
  - company secretary: '기업 비서'/'법인 간사' → '회사 비서'(인사이트 일치).
  - Annual Return: '연간 반환서'(오역) → '연간 보고서'.
  - governance: '거버넌스' → '지배구조'(2곳).
  - 조사 오류: 'Olive & Vine는' → 'Olive & Vine은'(2곳).
  - 오타: '워크를로우' → '디지털 업무 절차'.
  - 인칭: '당사는' → '저희는'.
  - 톤: 'Exit 퇴출' → '사업 정리'.
  - 기타: heroSubtitle(회사법·운영 추가), '조직된'→'체계적으로 정리된', '구조를 설립'→'갖출', '업데이트'→'갱신', '프로세스'→'과정', 불렛 가운뎃점.
  - 유지: '법정 등부'(인사이트 확정어).
- 글로서리 갱신: company secretary=회사 비서, Annual Return=연간 보고서, Companies Ordinance=회사법, 법정 등부.
- REVIEW_QUEUE 추가: 'Olive & Vine는→은' 사이트 전반(인사이트), '회사법 vs 회사 조례' 통일.

## 2026-06-03 (9차) / pageServicesUtils 후속 + pageAccountingServiceUtils.ts
- pageServicesUtils: 'Companies Ordinance' 결정 반영 — '회사 조례'→'회사법', '회사 법정 비서'→'회사 비서', '회사 등록관'→'회사등기소'. (REVIEW_QUEUE 법률용어 해결)
- pageAccountingServiceUtils — 글로서리 오역 집중 교정(§6 showcase):
  - 'audit supporting schedules 일정'→'감사 보조 명세서', 'auditor 감사사'→'감사인', 'audit trail 궤도'→'감사 추적 기록', 'controls 제어'→'내부 통제', 'system integrity'→'시스템 무결성'.
  - Konglish '가이딩 시'→'안내하든'. 'reconciliation'→'계정 대사', 'auditability'(누락)→'감사 대응력' 복원, '거버넌스'→'지배구조', '디지털 증거 궤도'→'디지털 증빙 기록'.
  - 기계번역 단락(intro/bookkeeping/accounting/private desc) 재작성, 불렛 §3 정비(명사형·가운뎃점).
- 글로서리 갱신: Companies Ordinance=홍콩 회사법, Registrar/Registry=회사등기소.
- 규칙 변동: 없음(v6).

## 2026-06-03 (10차) / pageAssuranceServiceUtils.ts
- 품질 양호(전문 번역). 일관성 위주 교정: '당사'→'저희'(전 occurrences), '회사 조례'→'회사법'(2곳), '귀사의'→'고객의', '내부 거버넌스'→'내부 지배구조'.
- 보증/인증(Assurance) 혼용 발견 → 임의 확정 보류, REVIEW_QUEUE 등재(타이틀=보증 / 본문=인증).
- 규칙 변동: 없음(v6).

## 2026-06-03 (11차) / pageTaxServiceUtils.ts
- HK 세목 용어 통일(인사이트 기준): 타임라인 'Profits Tax 법인세'→'이익세', 'Salaries Tax 개인소득세'→'급여세'.
- 명백한 오역 수정:
  - salariesTaxItems: '주소지 관리…IR56 양식 수작업 발급'(원문 'Digital generation' 오역) → '고용주 대상 IR56 양식 디지털 발급 및 관리'.
  - taxAdvisory: 'targeted guidance 목표 지향점'→'맞춤형 지침', 'offshore claim 해외 청구'→'역외 소득 비과세 신청'.
  - 'IRD 쿼리'→'IRD 문의', 'Hold over 보류 신청'→'예정세 납부 유예 신청', '용지 양식'→'종이 양식'.
- 단락 다듬기: taxServiceIntro(윤리 선언 — 'tax avoidance 세무 회피'→'조세 회피', 무결성→원칙, 장기 중복 해소), hero/profits desc 자연화.
- 글로서리 추가: Profits Tax=이익세, Salaries Tax=급여세, offshore claim, hold over, tax avoidance=조세 회피.
- 규칙 변동: 없음(v6).

## 2026-06-03 (12차) / pageConsultingServiceUtils.ts + pageHrServiceUtils.ts
- consulting: 품질 매우 양호. 일관성만 — '당사'→'저희'(전 occurrences), '우리는'→'저희는', '거버넌스'→'지배구조'(2곳).
- hr: 매우 깔끔. heroSubtitle만 pageServices와 동일 기계번역 교정('법정 혜택'→'법정 복리후생', '급여 요구사항'→'급여 의무', '프로세스'→'업무'). MPF 표기('강제적립금 제도 조례' vs 'MPF/법정 퇴직연금')는 인사이트 작업 시 통일 — 보류.
- 규칙 변동: 없음(v6).

## 2026-06-03 (13차) / pageUtils.ts (홈/공통, 최대)
- 메뉴 라벨 'Contact 고객지원'→'문의'(contact 페이지 H1과 일치), footer 'Contact 연락처'→'문의'.
- 글로서리 적용: services.corporate '법정 비서'→'회사 비서', '거버넌스'→'지배구조'(corporate/newVentures), services.tax '세무 위치'→'세무 포지션', portfolio 'Big 4'(prose)→'빅4'.
- 인칭/조사: cta '귀하의'→'고객의', compliance '당사'→'저희'·'Vine는'→'은'.
- 중복/직역 해소: aboutUs desc('제공' 2회), assurance desc('신뢰' 3회), SMEs('노출'→'마주'), 엔터티→법인, 워크플로우/프로세스 자연화, '적응 가능한'→'유연한'.
- REVIEW_QUEUE: 'Integrity' 가치어(진정성/정직성/진실함/정직) 통일 — 사용자 확정 대기.
- 규칙 변동: 없음(v6).

## 2026-06-03 (14차) / leadership/{rebecca,miyoung}.ts + dynamicPageConfig 이월
- rebecca: 'Olive and Vine'→'Olive & Vine', career '엔게이지먼트 리더'→'프로젝트 총괄'(확정), 'IL Shin'→'일신회계법인(IL Shin CPA Limited)', '국제최고의 회계법인'(어색)→'세계적인', 띄어쓰기(10년이상/의미있는/투자지주/감사담당회계사), eyebrow '리더십'→'주요 리더십'.
- miyoung: '공동 설립자'→'공동창업자'(통일), '내부 감사자'→'내부 감사 담당자', '그녀의 참된 목적'→'참된 소명', 'fraud 사기 탐지'→'부정 적발', 회사 비서 항목 '및' 중복 정리, eyebrow 통일.
- dynamicPageConfig.ts: 인사이트 메타데이터(제목·breadcrumb) → 인사이트 작업으로 이월(REVIEW_QUEUE에 수정 항목 기록).
- ✅ app/utils in-scope 페이지 카피 전부 처리 완료(인사이트 본문·insightCardsConfig 제외).
- 규칙 변동: 없음(v6).

## 2026-06-03 (15차) / 브랜드 용어 2건 사용자 확정
- Assurance: 보증/인증 단일 통일 안 함(사용자) — 'Assurance' 그대로, 현행 혼용 유지. 추가 편집 없음.
  → (후속 지시) Assurance를 뜻하는 모든 '보증'/'인증'을 한국어 버전에서도 영문 'Assurance'로 표기 변경:
    pageAssuranceServiceUtils(heroTitle·title·insightTag·기타 Assurance·본문 인증 서비스 등 다수),
    pageUtils('Assurance-service' 라벨·services.assurance.title·portfolio newVentures '보증'),
    pageAboutUtils(rebecca career 'Assurance'×2), leadership/rebecca(bio·career), leadership/miyoung(career),
    DynamicStatStrip('Assurance 점수').
    제외(Assurance 아님): '인증서 발급'·'공식 인증 보고서'(Certification), 아포스티유·영사 인증(authentication/legalization), '검증'(verification).
    타입체크 exit 0.
  → (후속) 하드코딩 .tsx 잔여 3곳도 교체: assurance-service/page.tsx 히어로 eyebrow '서비스 · 03 / 보증'→'/ Assurance', 섹션 '두 갈래의 보증'→'두 갈래의 Assurance', ServiceCTA assurance desc '보증 서비스'→'Assurance 서비스'.
    브라우저 탭 제목: PageTitle.tsx가 getDocumentPageName(pageUtils)로 설정 → 'Assurance-service' 라벨 이미 'Assurance'로 수정됨(reload 시 자동 반영). assurance-service/layout.tsx metadata title도 'Assurance'.
    최종 sweep: app 내(인사이트 제외) '보증'(Assurance) 0건. 남은 '인증'은 Certification/authentication만. tsc exit 0.
- Integrity: 기본 '정직성'(사용자). pageUtils 진정성→정직성 4곳(홈 가치 카드 title/words/desc + 준법 안내). leadership '진실함'은 서사 문맥으로 유지. system integrity=무결성.
- 글로서리 갱신: integrity=정직성(기본)/진정성(서사)/무결성(system), assurance=Assurance 유지.
- 최종 타입체크 tsc --noEmit exit 0(에러 0). 전 편집 구문 무결성 확인.
- 규칙 변동: 없음(v6).
