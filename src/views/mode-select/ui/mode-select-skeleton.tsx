import { CloseHeader, Screen, Skeleton } from "@/shared/ui";

type ModeSelectSkeletonProps = {
  groupId: string;
};

/** 라우트 loading.tsx용. 그룹을 불러오기 전 ModeSelectPage의 첫 화면과 같은 모양으로 맞춤 */
export default function ModeSelectSkeleton({ groupId }: ModeSelectSkeletonProps) {
  return (
    <Screen className="overflow-x-clip">
      <div className="flex flex-col gap-7">
        <CloseHeader closeHref={`/groups/${groupId}`} />
        <Skeleton className="h-16" />
      </div>
    </Screen>
  );
}
