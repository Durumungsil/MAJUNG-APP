import { Skeleton } from "@/shared/ui";

/** 스토리 지도를 불러오는 동안 보여주는 자리 (라우트 loading.tsx에서도 같이 씀) */
export default function StoryMapSkeleton() {
  return (
    <main className="flex flex-1 flex-col">
      <Skeleton className="aspect-[402/674] w-full rounded-none" />
      <div className="mt-8 flex flex-col gap-5 px-page">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-6 w-2/3" />
      </div>
    </main>
  );
}
