import Link from "next/link";
import { Logo } from "@/shared/assets";
import { HOME_PATH, PRIVACY_PATH } from "@/shared/config/routes";
import { SITE_NAME } from "@/shared/config/site";
import { Button, Screen } from "@/shared/ui";
import { SiteFooter } from "@/widgets/site-footer";
import { MODES, STEPS } from "../config/content";

/**
 * 누구나 보는 서비스 소개 화면 (`/`). 구글 OAuth 브랜딩 검토가 앱 이름·목적·개인정보처리방침 링크를
 * JS 없이 서버 HTML에서 읽으므로 서버 컴포넌트로만 만들고 클라이언트 데이터에 의존하지 말 것
 */
export default function LandingPage() {
  return (
    <Screen className="gap-12 text-text-primary">
      <header className="flex flex-col items-center gap-4 pt-10 text-center">
        <h1>
          <Logo className="h-14 w-77 text-primary-400" />
          <span className="sr-only">{SITE_NAME}</span>
        </h1>
        <p className="text-xl">
          친구와 함께 떠나는 여행,
          <br />
          모두의 취향을 모아 장소를 추천해요
        </p>
        <Link href={PRIVACY_PATH} className="text-primary-800 underline">
          개인정보처리방침
        </Link>
      </header>

      <section aria-labelledby="landing-about" className="flex flex-col gap-3">
        <h2 id="landing-about" className="text-point text-xxl">
          {SITE_NAME}은 이런 서비스예요
        </h2>
        <p>
          {SITE_NAME}은 친구·그룹이 함께 떠나는 여행에서 멤버별 취향 설문을 모아, 모두에게 맞는
          장소를 추천해 주는 서비스예요. 누가 어떤 답을 했는지는 다른 멤버에게 보이지 않고, 그룹
          전체의 조건을 합친 결과만 보여줘요.
        </p>
      </section>

      <section aria-labelledby="landing-modes" className="flex flex-col gap-4">
        <h2 id="landing-modes" className="text-point text-xxl">
          세 가지 여행 모드
        </h2>
        <ul className="flex flex-col gap-3">
          {MODES.map((mode) => (
            <li key={mode.name} className="flex flex-col gap-1 rounded-lg bg-primary-100 p-5">
              <h3 className="text-l">{mode.name}</h3>
              <p className="text-xs text-text-secondary">{mode.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="landing-steps" className="flex flex-col gap-4">
        <h2 id="landing-steps" className="text-point text-xxl">
          이렇게 사용해요
        </h2>
        <ol className="flex flex-col gap-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="text-point text-l text-primary-800">{index + 1}</span>
              <div className="flex flex-col">
                <h3 className="text-m">{step.title}</h3>
                <p className="text-xs text-text-secondary">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="landing-login" className="flex flex-col gap-3">
        <h2 id="landing-login" className="text-point text-xxl">
          Google 계정으로 로그인해요
        </h2>
        <p>
          {SITE_NAME}은 Google 계정으로 로그인하며, 이름·이메일 주소·Google 계정 식별자만 회원
          식별에 사용합니다. Gmail, Google Drive 등 다른 Google 데이터에는 접근하지 않아요.
        </p>
        <p className="text-xs text-text-secondary">
          자세한 내용은{" "}
          <Link href={PRIVACY_PATH} className="underline">
            개인정보처리방침
          </Link>
          에서 확인할 수 있어요.
        </p>
      </section>

      <Button variant="primary" size="xl" href={HOME_PATH}>
        시작하기
      </Button>

      <SiteFooter />
    </Screen>
  );
}
