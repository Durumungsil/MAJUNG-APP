"use client";

import { Button, Modal } from "@/shared/ui";
import { useLogout } from "../api/logout";

type LogoutModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function LogoutModal({ open, onClose }: LogoutModalProps) {
  const { mutate: logout, isPending } = useLogout();

  function handleLogoutClick() {
    logout();
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="logout-title" className="gap-5">
      <h2 id="logout-title" className="text-xl text-text-primary">
        로그아웃할까요?
      </h2>
      <div className="flex justify-center gap-4">
        <Button size="sm" variant="tertiary" onClick={onClose}>
          취소하기
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleLogoutClick}
          disabled={isPending}
          aria-busy={isPending}
        >
          로그아웃
        </Button>
      </div>
    </Modal>
  );
}
