# 번역 검수 왕복(round-trip) 파이프라인

비코더 교정자가 **Excel 한 파일**로 EN/KO를 검수하고, 그 결과를 **자동으로 코드에 되반영**하는 시스템.
모든 문자열은 변하지 않는 `ID`로 코드 위치와 1:1 연결된다. (왕복 무손실 검증 완료 — `\n`·`<br>`·`${}`·삼항·불렛 포함)

## 파일
- `scripts/walker.mjs` — **공유 AST 워커.** 추출/반영이 동일 로직을 쓰게 하는 단일 소스. in-scope 파일 목록·페이지 매핑·ID 규칙이 여기 있음. (인사이트 아티클 본문 제외)
- `scripts/extract.mjs` — 코드 → `proofreading/extracted.json`
- `scripts/build_xlsx.py` — `extracted.json` → `proofreading/Olive-and-Vine_번역검수.xlsx` (페이지별 시트 + 안내)
- `scripts/xlsx_to_edits.py` — 교정자가 채운 xlsx → `proofreading/edits.json` (수정된 줄만)
- `scripts/apply.mjs` — `edits.json` → 코드 파일에 in-place 반영 (`--dry`로 미리보기)
- `scripts/_roundtrip_test.py` — 무손실 회귀 테스트 (변경→복원, byte 동일 확인)

## 워크플로
### 1) 교정 파일 만들기 (코드 → Excel)
```bash
node i18n/scripts/extract.mjs
python3 i18n/scripts/build_xlsx.py
# => i18n/proofreading/Olive-and-Vine_번역검수.xlsx 를 교정자에게 전달
```
교정자는 초록색 `수정 EN`/`수정 KO`, 노란 `메모` 칸만 채운다. `ID`·`EN`·`KO`(회색)는 건드리지 않는다.
빈 칸 = 현재 그대로 유지.

### 2) 검수본 반영 (Excel → 코드)
```bash
# 교정자가 보내준 xlsx를 i18n/proofreading/ 에 두고:
python3 i18n/scripts/xlsx_to_edits.py i18n/proofreading/<받은파일>.xlsx
node i18n/scripts/apply.mjs --dry   # 미리보기
node i18n/scripts/apply.mjs         # 실제 반영
npx tsc --noEmit                    # 구문 검증
```

## 인사이트(아티클) 검수 — 별도 워크북 (2026-06-23 신설)
본문 페이지와 **분리된** 인사이트 전용 검수 파일. 같은 무손실 왕복 엔진(walker)을 재사용한다.
탭 하나 = 아티클 하나(`app/utils/insights/*.ts` 29개).

```bash
# 1) 인사이트 검수 파일 만들기 (코드 → Excel)
node i18n/scripts/extract-insights.mjs        # → extracted-insights.json
python3 i18n/scripts/build-insights-xlsx.py   # → Olive-and-Vine_인사이트검수.xlsx

# 2) 검수본 반영 (Excel → 코드) — 본문과 동일 스크립트 재사용
python3 i18n/scripts/xlsx_to_edits.py i18n/proofreading/Olive-and-Vine_인사이트검수.xlsx
node i18n/scripts/apply.mjs --dry   # 미리보기
node i18n/scripts/apply.mjs         # 반영
npx tsc --noEmit
```
- `apply.mjs`/`xlsx_to_edits.py`는 **ID 기반**이라 본문/인사이트 구분 없이 그대로 동작(스크립트 수정 불필요).
- walker에 `INSIGHT_FILES`·`PAGE_OF_INSIGHT` 추가됨. 본문용 `FILES`/`PAGE_OF`는 무변경(본문 파이프라인 영향 없음 — `_roundtrip_test.py` PASS).
- 인사이트 문체·용어 기준은 본문과 **동일**: `i18n/RULES.md`(v7)·`GLOSSARY.md`. (세무=법인세/소득세, 인칭=우리, 병기 규칙 등)

## 규칙/주의
- 교정자가 행을 추가·삭제하거나 ID를 바꾸면 매핑이 깨진다(안내 시트에 명시).
- `apply` 후 반드시 `tsc --noEmit`으로 깨진 따옴표/이스케이프가 없는지 확인.
- 코드 구조가 바뀌면(파일/키 이동) 같은 ID로 다시 `extract`하면 됨 — apply는 항상 **현재** 코드를 재파싱해 위치를 다시 찾는다(저장된 오프셋 미사용).
- 용어·문체 기준은 `i18n/GLOSSARY.md`, `i18n/RULES.md` 참조.
