import { TripCreatePage } from "@/views/trip-create";

export default async function Page({ params }: PageProps<"/groups/[groupId]/trips/new">) {
  const { groupId } = await params;
  return <TripCreatePage groupId={groupId} />;
}
