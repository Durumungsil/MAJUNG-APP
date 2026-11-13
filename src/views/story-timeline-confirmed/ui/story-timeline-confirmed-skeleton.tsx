import { Screen, Skeleton } from "@/shared/ui";

const SKELETON_CARD_COUNT = 4;

/** 확정된 타임라인을 불러오는 동안 보여주는 자리 (라우트 loading.tsx에서도 같이 씀) */
export default function StoryTimelineConfirmedSkeleton() {
  return (
    <Screen>
      <div className="mt-5 flex flex-col gap-5">
        <Skeleton className="h-8 w-1/2" />
        {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
          <Skeleton key={index} className="h-15" />
        ))}
      </div>
    </Screen>
  );
}
