import { Skeleton } from "@/shared/ui";

/** 길 안내 화면을 불러오는 동안 보여주는 자리 (라우트 loading.tsx에서도 같이 씀) */
export default function ExtremeNavigationSkeleton() {
  return (
    <main className="flex h-dvh flex-col">
      <Skeleton className="min-h-0 flex-1 rounded-none" />
      <div className="px-8 pt-8 pb-[max(--spacing(7.5),var(--safe-bottom))]">
        <Skeleton className="h-12 w-full" />
      </div>
    </main>
  );
}
