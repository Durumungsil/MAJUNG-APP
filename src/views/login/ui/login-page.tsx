import { Button, Screen } from "@/shared/ui";

export default function LoginPage() {
  return (
    <Screen>
      <p className="mt-25 text-xl text-black">
        마중이 마중 나왔어요!
        <br />
        로그인하고 즐거운 여행을 시작해요
      </p>
      {/* TODO: Supabase Google OAuth 연동 */}
      <Button href="/" className="mt-auto mb-35">
        구글로 로그인하기
      </Button>
    </Screen>
  );
}
