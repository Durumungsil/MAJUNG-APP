import { SurveyPage } from "@/views/survey";

export default async function Page({ params }: PageProps<"/groups/[groupId]/survey">) {
  const { groupId } = await params;
  return <SurveyPage groupId={groupId} />;
}
