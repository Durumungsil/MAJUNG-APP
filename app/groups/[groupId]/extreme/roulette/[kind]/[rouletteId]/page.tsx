import { ExtremePlaceDetailPage } from "@/views/extreme-place-detail";

export default async function Page({
  params,
}: PageProps<"/groups/[groupId]/extreme/roulette/[kind]/[rouletteId]">) {
  const { groupId, kind, rouletteId } = await params;
  return <ExtremePlaceDetailPage groupId={groupId} kind={kind} rouletteId={rouletteId} />;
}
