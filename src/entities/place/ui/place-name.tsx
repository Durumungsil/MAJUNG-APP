"use client";

import { Skeleton } from "@/shared/ui";
import { UNKNOWN_PLACE_NAME } from "../config/constants";
import { usePlaceDetails } from "../api/queries";

type PlaceNameProps = {
  placeId: string;
  /** 응답에 이름이 있으면(추천 결과) Google 조회 없이 그대로 씀 */
  name?: string | null;
};

/** 장소 이름. 일정·룰렛 응답에는 이름이 없어 Google SDK로 조회함 */
export default function PlaceName({ placeId, name = null }: PlaceNameProps) {
  const { data, isPending, isError } = usePlaceDetails(name === null ? placeId : null);

  if (name !== null) return name;
  if (isError || data?.name === "") return UNKNOWN_PLACE_NAME;
  if (isPending) return <Skeleton className="inline-block h-[1em] w-24 align-middle" />;
  return data.name;
}
