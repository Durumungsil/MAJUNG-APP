import { Screen, Skeleton } from "@/shared/ui";

const SKELETON_CARD_COUNT = 4;

/** 장소 목록 자리 */
export function PlaceListSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
        <Skeleton key={index} className="h-12" />
      ))}
    </div>
  );
}

/** 장소 선택 화면을 불러오는 동안 보여주는 자리 (라우트 loading.tsx에서도 같이 씀) */
export default function StoryPlacesSkeleton() {
  return (
    <Screen>
      <div className="mt-5 flex flex-col gap-5">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-6 w-2/3" />
        <PlaceListSkeleton />
      </div>
    </Screen>
  );
}
