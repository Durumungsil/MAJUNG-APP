"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { GroupForm, type GroupFormValues } from "@/entities/group";
import { CopyButton, Modal, TextField } from "@/shared/ui";

const MOCK_CREATED_INVITE_CODE = "B2K9QF";

export default function CreateGroupForm() {
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState<string | null>(null);

  function handleGroupSubmit(values: GroupFormValues) {
    void values;
    setInviteCode(MOCK_CREATED_INVITE_CODE);
  }

  function handleSuccessModalClose() {
    router.push("/groups");
  }

  return (
    <>
      <GroupForm
        dateLabels={{ start: "시작 시간", end: "종료 시간" }}
        showMaxMembersHint
        submitLabel="그룹 생성하기"
        onSubmit={handleGroupSubmit}
      />
      <Modal
        open={inviteCode !== null}
        onClose={handleSuccessModalClose}
        labelledBy="create-group-success-title"
        className="gap-4"
      >
        <h2 id="create-group-success-title" className="text-xl text-text-primary">
          그룹 생성이 완료 되었어요!
        </h2>
        <div className="flex w-full items-center gap-3.25">
          <TextField
            size="sm"
            readOnly
            value={inviteCode ?? ""}
            aria-label="초대 코드"
            className="w-47.5"
          />
          <CopyButton value={inviteCode ?? ""} label="초대 코드 복사" className="size-5" />
        </div>
      </Modal>
    </>
  );
}
