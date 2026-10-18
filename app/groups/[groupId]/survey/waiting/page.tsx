import { SurveyWaitingPage } from "@/views/survey-waiting";

export default async function Page({ params }: PageProps<"/groups/[groupId]/survey/waiting">) {
  const { groupId } = await params;
  return <SurveyWaitingPage groupId={groupId} />;
}
