"use client";

import { useState } from "react";
import { JoinGroupModal } from "@/features/join-group";
import { LogoutModal } from "@/features/logout";
import { PlusIcon, SettingsIcon } from "@/shared/assets";
import { DropdownMenu, type DropdownMenuItem } from "@/shared/ui";

export default function GroupListHeader() {
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  function handleJoinSelect() {
    setJoinModalOpen(true);
  }

  function handleJoinModalClose() {
    setJoinModalOpen(false);
  }

  function handleLogoutSelect() {
    setLogoutModalOpen(true);
  }

  function handleLogoutModalClose() {
    setLogoutModalOpen(false);
  }

  const addMenuItems: DropdownMenuItem[] = [
    { label: "그룹 생성", href: "/groups/new" },
    { label: "초대코드로 입장", onSelect: handleJoinSelect },
  ];

  const settingsMenuItems: DropdownMenuItem[] = [
    { label: "로그아웃", onSelect: handleLogoutSelect },
  ];

  return (
    <header className="flex items-center justify-between">
      <h1 className="text-xl text-black">그룹 목록</h1>
      <div className="flex items-center gap-4">
        <DropdownMenu
          triggerLabel="그룹 추가"
          trigger={<PlusIcon className="size-3.5" />}
          items={addMenuItems}
        />
        <DropdownMenu
          triggerLabel="설정"
          trigger={<SettingsIcon className="size-4.5" />}
          items={settingsMenuItems}
        />
      </div>
      <JoinGroupModal open={joinModalOpen} onClose={handleJoinModalClose} />
      <LogoutModal open={logoutModalOpen} onClose={handleLogoutModalClose} />
    </header>
  );
}
