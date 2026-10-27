import { ExtremeRoulettePage } from "@/views/extreme-roulette";

export default async function Page({
  params,
}: PageProps<"/groups/[groupId]/extreme/roulette/[kind]">) {
  const { groupId, kind } = await params;
  return <ExtremeRoulettePage groupId={groupId} kind={kind} />;
}
