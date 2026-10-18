import { Avatar } from "@/shared/ui";
import type { Member } from "../model/types";

type AvatarStackProps = {
  members: Pick<Member, "id" | "nickname" | "avatarUrl">[];
};

export default function AvatarStack({ members }: AvatarStackProps) {
  return (
    <ul className="flex items-center" aria-label={`그룹 멤버 ${members.length}명`}>
      {members.map((member) => (
        <li key={member.id} className="-mr-2 last:mr-0">
          <Avatar src={member.avatarUrl} alt={member.nickname} />
        </li>
      ))}
    </ul>
  );
}
