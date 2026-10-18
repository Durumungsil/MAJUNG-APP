import { CrownIcon } from "@/shared/assets";
import { Avatar } from "@/shared/ui";
import type { Member } from "../model/types";

type MemberItemProps = {
  member: Member;
};

export default function MemberItem({ member }: MemberItemProps) {
  return (
    <li className="flex items-center gap-5 p-2.5">
      <Avatar src={member.avatarUrl} alt="" size="md" />
      <div className="flex flex-col">
        {member.isLeader && <CrownIcon className="h-5 w-5 text-secondary-500" />}
        <p className="text-m text-black">
          {member.nickname}
          {member.isLeader && <span className="sr-only"> (그룹 리더)</span>}
        </p>
      </div>
    </li>
  );
}
