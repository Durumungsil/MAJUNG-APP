"use client";

import { useRouter } from "next/navigation";
import { Button, Modal } from "@/shared/ui";

type LeaveGroupModalProps = {
  groupId: string;
  open: boolean;
  onClose: () => void;
};

export default function LeaveGroupModal({ groupId, open, onClose }: LeaveGroupModalProps) {
  const router = useRouter();

  function handleLeaveClick() {
    void groupId;
    router.push("/groups");
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="leave-group-title" className="gap-5">
      <div className="flex flex-col items-center">
        <h2 id="leave-group-title" className="text-xl text-text-primary">
          정말 탈퇴하시겠어요?
        </h2>
        <p className="text-xs text-text-muted">선택하면 취소할 수 없어요</p>
      </div>
      <div className="flex justify-center gap-4">
        <Button size="sm" variant="tertiary" onClick={onClose}>
          취소하기
        </Button>
        <Button size="sm" variant="secondary" onClick={handleLeaveClick}>
          탈퇴하기
        </Button>
      </div>
    </Modal>
  );
}
