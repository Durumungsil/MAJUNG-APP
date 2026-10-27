import { ExtremeMainPage } from "@/views/extreme-main";

export default async function Page({ params }: PageProps<"/groups/[groupId]/extreme/play">) {
  const { groupId } = await params;
  return <ExtremeMainPage groupId={groupId} />;
}
