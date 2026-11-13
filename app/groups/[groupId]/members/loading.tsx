"use client";

import { useParams } from "next/navigation";
import { GroupMembersSkeleton } from "@/views/group-members";

// 이동하자마자 보여줄 화면. loading.tsx는 params를 받지 않아 주소에서 groupId를 읽음
export default function Loading() {
  const { groupId } = useParams<{ groupId: string }>();
  return <GroupMembersSkeleton groupId={groupId} />;
}
