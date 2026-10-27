import { ExtremeStartPage } from "@/views/extreme-start";

export default async function Page({ params }: PageProps<"/groups/[groupId]/extreme">) {
  const { groupId } = await params;
  return <ExtremeStartPage groupId={groupId} />;
}
