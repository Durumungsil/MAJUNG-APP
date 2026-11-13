import { BackHeader, Screen, Skeleton } from "@/shared/ui";

type GroupEditSkeletonProps = {
  groupId: string;
};

/** 그룹 수정 화면을 불러오는 동안 보여주는 자리 (라우트 loading.tsx에서도 같이 씀) */
export default function GroupEditSkeleton({ groupId }: GroupEditSkeletonProps) {
  return (
    <Screen>
      <BackHeader backHref={`/groups/${groupId}`} size="sm" title="그룹 수정하기" />
      <div className="mt-12.5 flex flex-col gap-6">
        <Skeleton className="h-9" />
        <Skeleton className="h-9" />
        <Skeleton className="h-9" />
      </div>
    </Screen>
  );
}
