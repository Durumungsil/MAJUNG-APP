"use client";

import { isApiError } from "@/shared/api";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
import { Button, Modal, Toast } from "@/shared/ui";
import { useEndMode } from "../api/end-mode";

type EndTripModalProps = {
  groupId: number;
  open: boolean;
  onClose: () => void;
};

/**
 * 그룹 상세에서 대표자가 진행 중인 여행 회차를 끝냄.
 * 끝나면 그룹 상세가 다시 받아져 "새 여행 시작하기"로 바뀌므로 화면 이동은 하지 않음.
 * 다른 기기에서 이미 끝냈으면(409) 끝난 것으로 봄
 */
export default function EndTripModal({ groupId, open, onClose }: EndTripModalProps) {
  const { mutate: endMode, isPending } = useEndMode(groupId);
  const { toastMessage, showToast } = useToast();

  function handleEndClick() {
    endMode(undefined, {
      onSuccess: onClose,
      onError: (error) => {
        if (isApiError(error, 409)) {
          onClose();
          return;
        }
        showToast(
          isApiError(error, 403) ? ERROR_MESSAGES.leaderOnly : ERROR_MESSAGES.requestFailed,
        );
      },
    });
  }

  return (
    <>
      <Modal open={open} onClose={onClose} labelledBy="end-trip-title" className="gap-5">
        <div className="flex flex-col items-center">
          <h2 id="end-trip-title" className="text-xl text-text-primary">
            여행을 종료할까요?
          </h2>
          <p className="text-xs text-text-muted">종료하면 진행 중인 모드를 이어서 할 수 없어요</p>
        </div>
        <div className="flex justify-center gap-4">
          <Button size="sm" variant="tertiary" onClick={onClose}>
            취소하기
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleEndClick}
            disabled={isPending}
            aria-busy={isPending}
          >
            종료하기
          </Button>
        </div>
      </Modal>
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
    </>
  );
}
