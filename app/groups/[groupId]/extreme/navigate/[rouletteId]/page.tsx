import { ExtremeNavigationPage } from "@/views/extreme-navigation";

export default async function Page({
  params,
}: PageProps<"/groups/[groupId]/extreme/navigate/[rouletteId]">) {
  const { groupId, rouletteId } = await params;
  return <ExtremeNavigationPage groupId={groupId} rouletteId={rouletteId} />;
}
