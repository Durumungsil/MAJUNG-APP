import { SITE_NAME } from "@/shared/config/site";
import { LegalDocument, LegalSection, LegalTable } from "@/widgets/legal-document";
import { SiteFooter } from "@/widgets/site-footer";
import { GOOGLE_USER_DATA_POLICY_URL, PRIVACY_EFFECTIVE_DATE } from "../config/policy";
import { COLLECTED_ITEMS, THIRD_PARTIES } from "../config/tables";
import PrivacyPolicyRest from "./privacy-policy-rest";

/** 개인정보처리방침 (`/privacy`). 구글 OAuth 검토가 서버 HTML로 읽으므로 정적 텍스트로만 구성함 */
export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="개인정보처리방침"
      effectiveDate={PRIVACY_EFFECTIVE_DATE}
      footer={<SiteFooter />}
    >
      <p>
        {SITE_NAME}(이하 “서비스”)은 「개인정보 보호법」 등 관련 법령을 지키며, 이용자의 개인정보를
        어떤 목적으로 수집·이용하고 어떻게 보호하는지 아래와 같이 안내합니다.
      </p>

      <LegalSection id="privacy-items" title="1. 수집하는 개인정보 항목과 수집 방법">
        <LegalTable
          caption="수집하는 개인정보 항목"
          headers={COLLECTED_ITEMS.headers}
          rows={COLLECTED_ITEMS.rows}
        />
        <p>
          알레르기 정보는 건강에 관한 정보일 수 있어, 이용자가 설문에 직접 입력한 경우에만 수집하며
          장소 추천과 음식점 필터링에만 사용합니다. 개별 멤버의 설문 응답은 다른 멤버에게 공개하지
          않고, 그룹 전체의 조건을 합친 결과만 보여줍니다.
        </p>
      </LegalSection>

      <LegalSection id="privacy-purpose" title="2. 개인정보의 이용 목적">
        <ul className="list-disc pl-5">
          <li>회원 가입 의사 확인, 회원 식별, 로그인 유지</li>
          <li>그룹 생성·초대·참여 등 그룹 여행 기능 제공</li>
          <li>멤버 취향 설문을 모아 그룹에 맞는 장소 추천과 일정·지도 경로 생성</li>
          <li>모험모드 위치 기반 미션의 도착 판정, 남은 거리 표시, 진행 기록 관리</li>
          <li>문의 응대와 서비스 오류 대응</li>
        </ul>
        <p>수집한 개인정보를 광고, 마케팅, 프로필 판매 목적으로 이용하지 않습니다.</p>
      </LegalSection>

      <LegalSection id="privacy-google" title="3. Google 사용자 데이터의 취급">
        <ul className="list-disc pl-5">
          <li>
            서비스가 Google에 요청하는 범위는 <code>openid</code>, <code>email</code>,{" "}
            <code>profile</code>뿐이며, 이를 통해 이메일 주소·이름·Google 계정 고유 식별자만
            전달받습니다.
          </li>
          <li>Gmail, Google Drive, 캘린더, 연락처 등 다른 Google 데이터에는 접근하지 않습니다.</li>
          <li>
            Google에서 받은 정보는 로그인과 회원 식별에만 사용하며, 광고·판매·제3자 제공에 사용하지
            않습니다. AI 모델 학습에도 사용하지 않습니다.
          </li>
          <li>
            Google 계정 정보는 Gemini API 등 다른 외부 서비스로 전송하지 않습니다. 서비스 운영자도
            장애 대응·법령 준수 등 꼭 필요한 경우가 아니면 이 정보를 열람하지 않습니다.
          </li>
        </ul>
        <p>
          {SITE_NAME}의 Google API 수신 정보 사용 및 다른 앱으로의 전송은 제한적 사용 요구사항을
          포함한 Google API 서비스 사용자 데이터 정책(
          <a href={GOOGLE_USER_DATA_POLICY_URL} className="break-all underline">
            {GOOGLE_USER_DATA_POLICY_URL}
          </a>
          )을 준수합니다.
        </p>
      </LegalSection>

      <LegalSection id="privacy-third-party" title="4. 제3자 제공·처리 위탁·국외 이전">
        <p>
          서비스는 이용자의 개인정보를 제3자에게 판매하거나 제공하지 않습니다. 다만 서비스 제공을
          위해 아래 업체에 처리를 위탁하며, 이 중 일부는 국외로 이전됩니다. 이전은 서비스 이용 시
          암호화된 네트워크(HTTPS)로 그때그때 전송하는 방식입니다.
        </p>
        <LegalTable
          caption="처리 위탁 및 국외 이전"
          headers={THIRD_PARTIES.headers}
          rows={THIRD_PARTIES.rows}
        />
        <p>
          Google 장소 데이터(장소 이름·사진 등)는 Google 지도 위나 “Google Maps” 출처 표기와 함께만
          보여주고, 카카오 지도·로드뷰에는 Google 장소 좌표를 넘기지 않습니다. 국외 이전을 원하지
          않으면 회원 탈퇴로 이전을 중단할 수 있으나, 이 경우 서비스를 이용할 수 없습니다.
        </p>
      </LegalSection>

      <PrivacyPolicyRest />
    </LegalDocument>
  );
}
