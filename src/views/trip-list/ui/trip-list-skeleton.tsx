import { BackHeader, Screen, Skeleton } from "@/shared/ui";

const SKELETON_CARD_COUNT = 2;

type TripListSkeletonProps = {
  groupId: string;
};

/** 라우트 loading.tsx용. 그룹·여행을 불러오기 전 TripListPage의 첫 화면과 같은 모양으로 맞춤 */
export default function TripListSkeleton({ groupId }: TripListSkeletonProps) {
  return (
    <Screen className="gap-8">
      <BackHeader backHref={`/groups/${groupId}`} size="sm" title="지난 여행 보기" />
      <Skeleton className="h-12" />
      <ol className="flex flex-col gap-5">
        {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
          <li key={index}>
            <Skeleton className="h-21" />
          </li>
        ))}
      </ol>
    </Screen>
  );
}
