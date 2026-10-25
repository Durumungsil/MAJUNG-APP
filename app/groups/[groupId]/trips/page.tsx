import { TripListPage } from "@/views/trip-list";

export default async function Page({ params }: PageProps<"/groups/[groupId]/trips">) {
  const { groupId } = await params;
  return <TripListPage groupId={groupId} />;
}
