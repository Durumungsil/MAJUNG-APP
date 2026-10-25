"use client";

import { useRouter } from "next/navigation";
import { isApiError } from "@/shared/api";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
import { Button, Modal, Toast } from "@/shared/ui";
import { useLeaveGroup } from "../api/leave-group";

type LeaveGroupModalProps = {
  groupId: number;
  /** 대표자는 대표자를 넘겨야 탈퇴할 수 있으므로 안내만 보여줌 */
  isLeader: boolean;
  open: boolean;
  onClose: () => void;
};

export default function LeaveGroupModal({
  groupId,
  isLeader,
  open,
  onClose,
}: LeaveGroupModalProps) {
  const router = useRouter();
  const { mutate: leaveGroup, isPending } = useLeaveGroup(groupId);
  const { toastMessage, showToast } = useToast();

  function handleLeaveClick() {
    leaveGroup(undefined, {
      onSuccess: () => router.push("/groups"),
      onError: (error) =>
        showToast(
          isApiError(error, 409) ? ERROR_MESSAGES.leaderCannotLeave : ERROR_MESSAGES.requestFailed,
        ),
    });
  }

  if (isLeader) {
    return (
      <Modal open={open} onClose={onClose} labelledBy="leave-group-title" className="gap-5">
        <div className="flex flex-col items-center gap-1">
          <h2 id="leave-group-title" className="text-xl text-text-primary">
            대표자를 먼저 넘겨주세요
          </h2>
          <p className="text-center text-xs text-text-muted">
            멤버 보기에서 다른 멤버를 대표자로 지정하면
            <br />
            탈퇴할 수 있어요
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Button size="sm" variant="tertiary" onClick={onClose}>
            취소하기
          </Button>
          <Button size="sm" variant="secondary" href={`/groups/${groupId}/members`}>
            멤버 보기
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <>
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
          <Button
            size="sm"
            variant="secondary"
            onClick={handleLeaveClick}
            disabled={isPending}
            aria-busy={isPending}
          >
            탈퇴하기
          </Button>
        </div>
      </Modal>
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
    </>
  );
}
