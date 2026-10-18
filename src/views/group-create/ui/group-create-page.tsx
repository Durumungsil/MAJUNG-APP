import { CreateGroupForm } from "@/features/create-group";
import { BackHeader, Screen } from "@/shared/ui";

export default function GroupCreatePage() {
  return (
    <Screen>
      <BackHeader backHref="/groups" title="그룹 생성하기" />
      <CreateGroupForm />
    </Screen>
  );
}
