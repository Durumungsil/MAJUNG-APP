import { GroupCard, getGroups } from "@/entities/group";
import { CreateGroupSuccessModal } from "@/features/create-group";
import { SurveyRequestBanner } from "@/features/submit-survey";
import { Screen } from "@/shared/ui";
import GroupListHeader from "./group-list-header";

export default function GroupListPage() {
  const groups = getGroups();
  const pendingSurveyGroup = groups.find((group) => group.hasPendingSurvey);

  return (
    <Screen className="gap-7">
      <GroupListHeader />
      {pendingSurveyGroup && (
        <SurveyRequestBanner
          groupName={pendingSurveyGroup.name}
          href={`/groups/${pendingSurveyGroup.id}/survey`}
        />
      )}
      <ul className="flex flex-col gap-5">
        {groups.map((group) => (
          <li key={group.id}>
            <GroupCard group={group} />
          </li>
        ))}
      </ul>
      <CreateGroupSuccessModal />
    </Screen>
  );
}
