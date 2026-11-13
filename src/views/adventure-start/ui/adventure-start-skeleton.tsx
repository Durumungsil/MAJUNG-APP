import { CloseHeader, Screen, Skeleton } from "@/shared/ui";

type AdventureStartSkeletonProps = {
  groupId: string;
};

/** 모험모드 시작 화면을 불러오는 동안 보여주는 자리 (라우트 loading.tsx에서도 같이 씀) */
export default function AdventureStartSkeleton({ groupId }: AdventureStartSkeletonProps) {
  return (
    <Screen>
      <CloseHeader closeHref={`/groups/${groupId}`} />
      <Skeleton className="mt-5 h-40" />
    </Screen>
  );
}
