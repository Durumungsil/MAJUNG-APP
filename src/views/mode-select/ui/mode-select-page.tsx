import { notFound } from "next/navigation";
import { getGroup } from "@/entities/group";
import { ModeSelectForm } from "@/features/select-mode";
import { CloseHeader, Screen } from "@/shared/ui";

type ModeSelectPageProps = {
  groupId: string;
};

export default function ModeSelectPage({ groupId }: ModeSelectPageProps) {
  const group = getGroup(groupId);
  if (!group) notFound();

  return (
    <Screen className="overflow-x-clip">
      <div className="flex flex-col gap-7">
        <CloseHeader closeHref={`/groups/${group.id}`} />
        <h1 className="text-xl text-text-primary">
          {group.name}로 여행을 시작해요!
          <br />
          계획 방법을 정해볼까요?
        </h1>
      </div>
      <ModeSelectForm confirmHref={`/groups/${group.id}/survey`} />
    </Screen>
  );
}
