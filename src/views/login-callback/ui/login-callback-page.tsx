import { GoogleLoginCallback } from "@/features/login-with-google";
import { Screen } from "@/shared/ui";

export default function LoginCallbackPage() {
  return (
    <Screen>
      <GoogleLoginCallback />
    </Screen>
  );
}
