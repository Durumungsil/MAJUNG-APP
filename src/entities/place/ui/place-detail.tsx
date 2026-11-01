"use client";

import { PLACE_CATEGORY_LABEL } from "../config/category";
import { UNKNOWN_PLACE_NAME } from "../config/constants";
import { useResolvedPlace } from "../api/queries";
import type { Place } from "../model/types";
import PlaceName from "./place-name";
import PlacePhoto from "./place-photo";

type PlaceDetailProps = {
  place: Place;
  titleId: string;
};

/** 장소 상세. 평점·리뷰 등은 추가 요금이 들어 요청하지 않고, 이름·카테고리·사진 1장만 보여줌 */
export default function PlaceDetail({ place, titleId }: PlaceDetailProps) {
  const { name } = useResolvedPlace(place);

  return (
    <div className="flex flex-col gap-6 text-text-primary">
      <div className="flex items-center gap-5 whitespace-nowrap">
        <h2 id={titleId} className="min-w-0 truncate text-xxl">
          <PlaceName placeId={place.id} name={place.name} />
        </h2>
        {place.category && (
          <span className="shrink-0 text-m text-primary-800">
            {PLACE_CATEGORY_LABEL[place.category]}
          </span>
        )}
      </div>
      <PlacePhoto placeId={place.id} placeName={name ?? UNKNOWN_PLACE_NAME} />
    </div>
  );
}
