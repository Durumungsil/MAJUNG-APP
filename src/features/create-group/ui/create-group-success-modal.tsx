"use client";

import { CopyButton, Modal, TextField } from "@/shared/ui";
import { useCreatedGroupStore } from "../model/created-group-store";

export default function CreateGroupSuccessModal() {
  const inviteCode = useCreatedGroupStore((state) => state.inviteCode);
  const clear = useCreatedGroupStore((state) => state.clear);

  function handleModalClose() {
    clear();
  }

  return (
    <Modal
      open={inviteCode !== null}
      onClose={handleModalClose}
      labelledBy="create-group-success-title"
      className="gap-4"
    >
      <h2 id="create-group-success-title" className="text-l text-text-primary">
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
  );
}
