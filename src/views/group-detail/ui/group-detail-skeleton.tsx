import { Screen, Skeleton } from "@/shared/ui";

/** 그룹 상세를 불러오는 동안 보여주는 자리 (라우트 loading.tsx에서도 같이 씀) */
export default function GroupDetailSkeleton() {
  return (
    <Screen>
      <Skeleton className="h-6 w-6" />
      <div className="mt-8 flex flex-col gap-10">
        <Skeleton className="h-12" />
        <div className="flex flex-col gap-6">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </div>
      <Skeleton className="mt-12.5 h-32" />
    </Screen>
  );
}
