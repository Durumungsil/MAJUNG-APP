"use client";

import { useRouter } from "next/navigation";
import { isApiError } from "@/shared/api";
import { ERROR_MESSAGES } from "@/shared/config/error-messages";
import { useToast } from "@/shared/lib";
import { Button, Toast } from "@/shared/ui";
import { useStartAdventure } from "../api/start-adventure";

type StartAdventureButtonProps = {
  groupId: number;
  className?: string;
};

function getStartAdventureErrorMessage(error: unknown): string {
  if (isApiError(error, 400)) return ERROR_MESSAGES.adventureOutOfTripPeriod;
  if (isApiError(error, 404)) return ERROR_MESSAGES.noActiveTrip;
  if (isApiError(error, 409)) return ERROR_MESSAGES.adventureUnavailable;
  return ERROR_MESSAGES.requestFailed;
}

export default function StartAdventureButton({ groupId, className }: StartAdventureButtonProps) {
  const router = useRouter();
  const { mutate: startAdventure, isPending } = useStartAdventure(groupId);
  const { toastMessage, showToast } = useToast();

  function handleStartClick() {
    startAdventure(undefined, {
      onSuccess: () => router.push(`/groups/${groupId}/adventure/map`),
      onError: (error) => showToast(getStartAdventureErrorMessage(error)),
    });
  }

  return (
    <>
      <Button
        size="xl"
        disabled={isPending}
        aria-busy={isPending}
        onClick={handleStartClick}
        className={className}
      >
        모험 모드 시작하기
      </Button>
      <Toast open={toastMessage !== null} message={toastMessage ?? ""} />
    </>
  );
}
