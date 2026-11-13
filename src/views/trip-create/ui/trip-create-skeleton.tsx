import { BackHeader, Screen, Skeleton } from "@/shared/ui";

type TripCreateSkeletonProps = {
  groupId: string;
};

/** 새 여행 시작 화면을 불러오는 동안 보여주는 자리 (라우트 loading.tsx에서도 같이 씀) */
export default function TripCreateSkeleton({ groupId }: TripCreateSkeletonProps) {
  return (
    <Screen>
      <BackHeader backHref={`/groups/${groupId}`} size="sm" title="새 여행 시작하기" />
      <div className="mt-8 flex flex-col gap-6">
        <Skeleton className="h-12" />
        <Skeleton className="h-9" />
        <Skeleton className="h-9" />
      </div>
    </Screen>
  );
}
