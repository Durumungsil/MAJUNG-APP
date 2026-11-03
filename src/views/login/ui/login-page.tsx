import { GoogleLoginButton } from "@/features/login-with-google";
import { Screen } from "@/shared/ui";
import { SiteFooter } from "@/widgets/site-footer";

export default function LoginPage() {
  return (
    <Screen>
      <p className="mt-25 text-xl text-black">
        마중이 마중 나왔어요!
        <br />
        로그인하고 즐거운 여행을 시작해요
      </p>
      <GoogleLoginButton className="mt-auto" />
      <SiteFooter className="mt-8 mb-20 items-center text-center" />
    </Screen>
  );
}
