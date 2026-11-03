import { CONTACT_EMAIL, OPERATOR_NAME, SITE_NAME } from "@/shared/config/site";
import { LegalSection, LegalTable } from "@/widgets/legal-document";
import { GOOGLE_PERMISSIONS_URL, PRIVACY_EFFECTIVE_DATE } from "../config/policy";
import { BROWSER_STORAGE } from "../config/tables";

/** 개인정보처리방침 5~11항 (보유·파기부터 시행일까지) */
export default function PrivacyPolicyRest() {
  return (
    <>
      <LegalSection id="privacy-retention" title="5. 보유 기간과 파기">
        <ul className="list-disc pl-5">
          <li>회원 정보와 그룹·여행·설문·미션 기록은 회원 탈퇴 시 지체 없이 삭제합니다.</li>
          <li>리프레시 토큰은 발급 후 14일이 지나면 만료되고, 로그아웃하면 즉시 폐기됩니다.</li>
          <li>초대 코드는 발급 후 1일이 지나면 만료됩니다.</li>
          <li>Google 장소 좌표는 서버에 저장한 뒤 30일이 지나면 삭제합니다.</li>
          <li>
            전자적 파일은 복구할 수 없는 방법으로 삭제합니다. 법령에 따라 보관해야 하는 정보가
            있으면 해당 기간 동안만 분리해 보관합니다.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="privacy-location" title="6. 위치정보">
        <ul className="list-disc pl-5">
          <li>
            기기 위치는 모험모드에서만, 미션을 시작하거나 완료를 확인하는 시점에만 수집합니다. 이동
            경로를 계속 추적하지 않습니다.
          </li>
          <li>
            미션 시작 위치는 남은 거리 계산을 위해 미션 기록과 함께 저장되고, 완료 확인 위치는 도착
            판정에만 사용합니다.
          </li>
          <li>
            위치 권한은 위치가 필요한 시점에 브라우저가 묻습니다. 권한을 거부하면 모험모드를 이용할
            수 없으며, 다른 모드는 그대로 이용할 수 있습니다.
          </li>
          <li>
            지도 화면에서 보여주는 현재 위치는 이용자의 기기 화면에 지도를 그리는 데 사용합니다.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="privacy-rights" title="7. 이용자의 권리와 행사 방법">
        <p>
          이용자는 언제든지 자신의 개인정보 열람·정정·삭제·처리정지와 회원 탈퇴를 요청할 수
          있습니다. 취향 설문은 서비스 안에서 다시 작성할 수 있고, 그룹은 직접 나갈 수 있습니다. 그
          밖의 요청과 회원 탈퇴는 아래 문의처 이메일로 보내 주시면 본인 확인 후 지체 없이
          처리합니다. [확인 필요: 서비스 안 회원 탈퇴 기능 제공 여부·일정]
        </p>
        <p>
          Google 계정 연결을 끊으려면 Google 계정의 “타사 앱 및 서비스” 화면(
          <a href={GOOGLE_PERMISSIONS_URL} className="break-all underline">
            {GOOGLE_PERMISSIONS_URL}
          </a>
          )에서 {SITE_NAME}의 액세스 권한을 삭제하면 됩니다. 연결을 끊어도 서비스에 저장된 정보는
          삭제되지 않으므로, 삭제를 원하면 회원 탈퇴를 함께 요청해 주세요.
        </p>
      </LegalSection>

      <LegalSection id="privacy-children" title="8. 만 14세 미만 아동의 개인정보">
        <p>
          [확인 필요: 만 14세 미만 아동 정책 — 가입 제한 / 법정대리인 동의 절차 중 택1] 만 14세 미만
          아동의 개인정보를 처리할 때에는 법령에 따라 법정대리인의 동의를 받습니다.
        </p>
      </LegalSection>

      <LegalSection id="privacy-storage" title="9. 쿠키와 브라우저 저장소">
        <p>
          서비스는 자체 쿠키를 사용하지 않습니다. 로그인 유지 등을 위해 브라우저 저장소에 아래
          정보를 저장하며, 브라우저 설정에서 사이트 데이터를 지우면 삭제됩니다(삭제하면
          로그아웃됩니다). 지도 표시를 위해 불러오는 Google 지도·카카오 지도는 각 사의 정책에 따라
          쿠키 등을 사용할 수 있습니다.
        </p>
        <LegalTable
          caption="브라우저 저장소 사용"
          headers={BROWSER_STORAGE.headers}
          rows={BROWSER_STORAGE.rows}
        />
      </LegalSection>

      <LegalSection id="privacy-officer" title="10. 개인정보 보호책임자와 문의처">
        <ul className="list-disc pl-5">
          <li>운영 주체: {OPERATOR_NAME}</li>
          <li>개인정보 보호책임자: [확인 필요: 책임자 이름]</li>
          <li>
            연락처:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
              {CONTACT_EMAIL}
            </a>
          </li>
        </ul>
        <p>
          개인정보 침해에 대한 상담이 필요하면 개인정보침해신고센터(privacy.kisa.or.kr, 국번 없이
          118), 개인정보분쟁조정위원회(www.kopico.go.kr, 1833-6972)에 문의할 수 있습니다.
        </p>
      </LegalSection>

      <LegalSection id="privacy-changes" title="11. 시행일자와 변경 고지">
        <p>이 개인정보처리방침은 {PRIVACY_EFFECTIVE_DATE}부터 시행합니다.</p>
        <p>
          내용이 바뀌면 시행 7일 전부터 서비스 첫 화면과 이 페이지에 공지하며, 수집 항목이나 이용
          목적이 늘어나는 등 중요한 변경은 시행 30일 전부터 공지합니다.
        </p>
      </LegalSection>
    </>
  );
}
