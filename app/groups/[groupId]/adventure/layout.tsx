import { TripEndGuard } from "@/widgets/trip-end-guard";

export default async function Layout({
  children,
  params,
}: LayoutProps<"/groups/[groupId]/adventure">) {
  const { groupId } = await params;
  return (
    <>
      {children}
      <TripEndGuard groupId={groupId} />
    </>
  );
}
