import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTrip, groupKeys } from "@/entities/group";

type StartTripValues = {
  region: string;
  /** YYYY-MM-DD */
  startDate: string;
  /** YYYY-MM-DD */
  endDate: string;
};

/** 여행 회차 생성 - 대표자만 가능, 끝나지 않은 여행이 있으면 409 */
export function useStartTrip(groupId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: StartTripValues) => createTrip(groupId, values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: groupKeys.all }),
  });
}
