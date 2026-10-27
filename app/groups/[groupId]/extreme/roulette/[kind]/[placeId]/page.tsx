import { ExtremePlaceDetailPage } from "@/views/extreme-place-detail";

export default async function Page({
  params,
}: PageProps<"/groups/[groupId]/extreme/roulette/[kind]/[placeId]">) {
  const { groupId, kind, placeId } = await params;
  return <ExtremePlaceDetailPage groupId={groupId} kind={kind} placeId={placeId} />;
}
