import { CloseHeader, Screen, Skeleton } from "@/shared/ui";

type SurveySkeletonProps = {
  groupId: string;
};

/** 취향 설문 화면을 불러오는 동안 보여주는 자리 (라우트 loading.tsx에서도 같이 씀) */
export default function SurveySkeleton({ groupId }: SurveySkeletonProps) {
  return (
    <Screen className="gap-7">
      <CloseHeader closeHref={`/groups/${groupId}`} />
      <div className="flex flex-col gap-5">
        <Skeleton className="h-14" />
        <Skeleton className="h-8" />
      </div>
    </Screen>
  );
}
