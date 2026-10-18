import { ModeSelectPage } from "@/views/mode-select";

export default async function Page({ params }: PageProps<"/groups/[groupId]/mode">) {
  const { groupId } = await params;
  return <ModeSelectPage groupId={groupId} />;
}
