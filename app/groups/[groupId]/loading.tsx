import { GroupDetailSkeleton } from "@/views/group-detail";

// 이동하자마자 보여줄 화면 (동적 라우트는 loading.tsx가 있어야 미리 받아 둘 수 있음)
export default function Loading() {
  return <GroupDetailSkeleton />;
}
