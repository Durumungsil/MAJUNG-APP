import { ModeTitle, Screen } from "@/shared/ui";

/** 라우트 loading.tsx용. 화면 제목을 먼저 보여주고 본문은 화면이 뜬 뒤 각자 불러옴 */
export default function ExtremeRouletteSkeleton() {
  return (
    <Screen>
      <ModeTitle className="mt-7.75">EXTREME MODE</ModeTitle>
    </Screen>
  );
}
