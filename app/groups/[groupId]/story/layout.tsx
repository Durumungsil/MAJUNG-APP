import { GroupListShortcut } from "@/widgets/group-list-shortcut";
import { TripEndGuard } from "@/widgets/trip-end-guard";

export default async function Layout({ children, params }: LayoutProps<"/groups/[groupId]/story">) {
  const { groupId } = await params;
  return (
    <>
      {children}
      <GroupListShortcut startPath={`/groups/${groupId}/story`} />
      <TripEndGuard groupId={groupId} />
    </>
  );
}
