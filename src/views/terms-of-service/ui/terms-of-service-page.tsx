import Link from "next/link";
import { PRIVACY_PATH } from "@/shared/config/routes";
import { CONTACT_EMAIL, OPERATOR_NAME, SITE_NAME } from "@/shared/config/site";
import { LegalDocument, LegalSection } from "@/widgets/legal-document";
import { SiteFooter } from "@/widgets/site-footer";

const TERMS_EFFECTIVE_DATE = "2026년 11월 3일";

/** 이용약관 (`/terms`). 개인정보처리방침과 같이 서버 HTML에 본문이 들어가는 정적 문서 */
export default function TermsOfServicePage() {
  return (
    <LegalDocument title="이용약관" effectiveDate={TERMS_EFFECTIVE_DATE} footer={<SiteFooter />}>
      <LegalSection id="terms-purpose" title="제1조 (목적)">
        <p>
          이 약관은 {OPERATOR_NAME}(이하 “운영자”)이 제공하는 {SITE_NAME}(이하 “서비스”)의 이용
          조건과 절차, 운영자와 이용자의 권리·의무를 정합니다.
        </p>
      </LegalSection>

      <LegalSection id="terms-service" title="제2조 (서비스 내용)">
        <p>
          서비스는 친구·그룹이 함께 떠나는 여행에서 멤버별 취향 설문을 모아 장소를 추천하고, 다음
          모드를 제공합니다.
        </p>
        <ul className="list-disc pl-5">
          <li>스토리모드: 그룹 취향에 맞는 장소 추천, 일정 타임라인과 지도 경로 생성</li>
          <li>모험모드: 목적지를 숨긴 채 로드뷰 힌트로 찾아가는 위치 기반 미션</li>
          <li>극한모드: 룰렛으로 여행지와 식당을 무작위 추첨</li>
        </ul>
        <p>
          추천 장소와 일정, 장소 정보는 외부 지도·장소 데이터와 자동 계산을 바탕으로 하며 영업
          여부·가격·알레르기 안전 등을 보증하지 않습니다. 방문 전 이용자가 직접 확인해야 합니다.
        </p>
      </LegalSection>

      <LegalSection id="terms-account" title="제3조 (계정)">
        <ul className="list-disc pl-5">
          <li>
            서비스는 Google 계정으로 로그인하며, 처음 로그인하면 계정이 자동으로 만들어집니다.
          </li>
          <li>
            이용자는 자신의 Google 계정과 기기를 직접 관리해야 하며, 타인에게 양도할 수 없습니다.
          </li>
          <li>
            개인정보 처리에 관한 사항은{" "}
            <Link href={PRIVACY_PATH} className="underline">
              개인정보처리방침
            </Link>
            을 따릅니다.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="terms-prohibited" title="제4조 (금지 행위)">
        <ul className="list-disc pl-5">
          <li>타인의 계정을 이용하거나 타인의 정보를 도용하는 행위</li>
          <li>다른 멤버의 설문 응답을 알아내려 하거나 익명성을 해치는 행위</li>
          <li>위치 정보를 조작해 미션을 완료하는 등 서비스를 부정하게 이용하는 행위</li>
          <li>서비스 서버에 과도한 요청을 보내거나 정상 운영을 방해하는 행위</li>
          <li>법령이나 공공질서에 어긋나는 내용을 그룹 이름 등에 입력하는 행위</li>
        </ul>
        <p>운영자는 금지 행위가 확인되면 서비스 이용을 제한할 수 있습니다.</p>
      </LegalSection>

      <LegalSection id="terms-safety" title="제5조 (위치 기반 미션 이용 시 안전)">
        <ul className="list-disc pl-5">
          <li>
            모험모드는 실제 장소로 이동하는 미션입니다. 이동 중에는 화면을 보지 말고 주변 교통
            상황과 보행 신호를 먼저 확인해 주세요.
          </li>
          <li>
            이동 중 교통안전과 개인 안전은 이용자 본인의 책임입니다. 출입이 제한된 장소, 사유지,
            위험한 장소에는 들어가지 마세요.
          </li>
          <li>운전 중에는 서비스를 조작하지 마세요.</li>
        </ul>
      </LegalSection>

      <LegalSection id="terms-change" title="제6조 (서비스 변경·중단)">
        <p>
          운영자는 서비스 개선, 외부 API 정책 변경, 설비 점검 등의 사유로 서비스 일부 또는 전부를
          변경·중단할 수 있으며, 미리 서비스 화면에 공지합니다. 부득이한 경우 사후에 공지할 수
          있습니다.
        </p>
      </LegalSection>

      <LegalSection id="terms-disclaimer" title="제7조 (면책)">
        <ul className="list-disc pl-5">
          <li>
            운영자는 천재지변, 외부 서비스(Google, Kakao 등) 장애 등 운영자가 통제할 수 없는 사유로
            생긴 손해에 책임을 지지 않습니다.
          </li>
          <li>
            추천 장소 방문, 이동, 음식 섭취 등 이용자의 선택으로 생긴 손해에 대해 운영자의 고의 또는
            중대한 과실이 없는 한 책임을 지지 않습니다.
          </li>
          <li>서비스는 무료로 제공되며, 관련 법령이 허용하는 범위에서 책임이 제한됩니다.</li>
        </ul>
      </LegalSection>

      <LegalSection id="terms-law" title="제8조 (준거법과 분쟁 해결)">
        <p>
          이 약관은 대한민국 법률에 따르며, 서비스 이용과 관련한 분쟁은 「민사소송법」에 따른 관할
          법원에서 해결합니다.
        </p>
      </LegalSection>

      <LegalSection id="terms-contact" title="제9조 (문의처)">
        <p>
          서비스 관련 문의는{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>
          로 보내 주세요.
        </p>
        <p>이 약관은 {TERMS_EFFECTIVE_DATE}부터 시행합니다.</p>
      </LegalSection>
    </LegalDocument>
  );
}
