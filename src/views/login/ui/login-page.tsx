import { GoogleLoginButton } from "@/features/login-with-google";
import { MajungCharacterImage } from "@/shared/assets";
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
      {/* 작은 화면에서도 로그인 버튼이 밀려나지 않게 화면 높이에 따라 줄어듦 */}
      <MajungCharacterImage className="mt-8 h-69 max-h-[32dvh] w-auto self-center" />
      <GoogleLoginButton className="mt-auto" />
      <SiteFooter className="mt-8 mb-20 items-center text-center" />
    </Screen>
  );
}
