import { Screen, Spinner } from "@/shared/ui";

/** 라우트 loading.tsx용. 대기 화면은 원래 스피너라 같은 스피너와 문구를 먼저 보여줌 */
export default function SurveyWaitingSkeleton() {
  return (
    <Screen className="items-center">
      <div className="mt-9.75 flex flex-col items-center gap-16">
        <Spinner />
        <p className="text-center text-xl text-text-primary">
          친구들이 취향 설문지를
          <br />
          입력하고 있어요!
        </p>
      </div>
    </Screen>
  );
}
