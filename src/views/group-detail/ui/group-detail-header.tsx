"use client";

import { useState } from "react";
import type { GroupRole } from "@/entities/group";
import { EndTripModal } from "@/features/end-mode";
import { LeaveGroupModal } from "@/features/leave-group";
import { DotsVerticalIcon } from "@/shared/assets";
import { BackHeader, DropdownMenu, type DropdownMenuItem } from "@/shared/ui";

type GroupDetailHeaderProps = {
  groupId: number;
  role: GroupRole;
  /** 진행 중인 여행을 끝낼 수 있으면 대표자 메뉴에 여행 종료를 보여줌 */
  canEndTrip: boolean;
};

export default function GroupDetailHeader({ groupId, role, canEndTrip }: GroupDetailHeaderProps) {
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [endTripModalOpen, setEndTripModalOpen] = useState(false);

  function handleLeaveSelect() {
    setLeaveModalOpen(true);
  }

  function handleLeaveModalClose() {
    setLeaveModalOpen(false);
  }

  function handleEndTripSelect() {
    setEndTripModalOpen(true);
  }

  function handleEndTripModalClose() {
    setEndTripModalOpen(false);
  }

  const membersItem: DropdownMenuItem = {
    label: "그룹 멤버 보기",
    href: `/groups/${groupId}/members`,
  };
  const leaveItem: DropdownMenuItem = { label: "그룹 탈퇴하기", onSelect: handleLeaveSelect };
  const endTripItem: DropdownMenuItem = { label: "여행 종료하기", onSelect: handleEndTripSelect };
  const menuItems: DropdownMenuItem[] =
    role === "leader"
      ? [
          { label: "그룹 수정하기", href: `/groups/${groupId}/edit` },
          membersItem,
          ...(canEndTrip ? [endTripItem] : []),
          leaveItem,
        ]
      : [leaveItem, membersItem];

  return (
    <>
      <BackHeader
        backHref="/groups"
        size="sm"
        right={
          <DropdownMenu
            triggerLabel="그룹 메뉴"
            trigger={<DotsVerticalIcon className="size-5" />}
            items={menuItems}
          />
        }
      />
      <LeaveGroupModal
        groupId={groupId}
        isLeader={role === "leader"}
        open={leaveModalOpen}
        onClose={handleLeaveModalClose}
      />
      {canEndTrip && (
        <EndTripModal groupId={groupId} open={endTripModalOpen} onClose={handleEndTripModalClose} />
      )}
    </>
  );
}
