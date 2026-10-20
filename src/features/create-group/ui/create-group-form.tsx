"use client";

import { useRouter } from "next/navigation";
import { GroupForm, type GroupFormValues } from "@/entities/group";
import { useCreatedGroupStore } from "../model/created-group-store";

const MOCK_CREATED_INVITE_CODE = "B2K9QF";

export default function CreateGroupForm() {
  const router = useRouter();
  const setInviteCode = useCreatedGroupStore((state) => state.setInviteCode);

  function handleGroupSubmit(values: GroupFormValues) {
    void values;
    // 완료 모달은 그룹 목록 화면 위에 띄움 (Figma: 그룹 생성 성공)
    setInviteCode(MOCK_CREATED_INVITE_CODE);
    router.push("/groups");
  }

  return (
    <GroupForm
      layout="create"
      dateLabels={{ start: "시작 시간", end: "종료 시간" }}
      submitLabel="그룹 생성하기"
      onSubmit={handleGroupSubmit}
    />
  );
}
