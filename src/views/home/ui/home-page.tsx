import { Logo } from "@/shared/assets";
import { Button, Screen } from "@/shared/ui";

export default function HomePage() {
  return (
    <Screen className="items-center">
      <h1 className="mt-45">
        <Logo className="h-14 w-77 text-primary-400" />
      </h1>
      <div className="mt-auto mb-36 flex w-full flex-col gap-4">
        {/* TODO: 혼자 가기 플로우 디자인 확정 후 연결 */}
        <Button variant="secondary">혼자 가요</Button>
        <Button variant="primary" href="/groups">
          친구와 함께가요
        </Button>
      </div>
    </Screen>
  );
}
