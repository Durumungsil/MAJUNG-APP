"use client";

import { useState } from "react";
import { ErrorState, Skeleton } from "@/shared/ui";
import { PLACE_CATEGORY_LABEL } from "../config/category";
import { UNKNOWN_PLACE_NAME } from "../config/constants";
import { usePlaceDetailInfo } from "../api/queries";
import type { Place } from "../model/types";
import PlaceOpenStatus from "./place-open-status";
import PlacePhoto from "./place-photo";
import PlaceReviews from "./place-reviews";

type PlaceDetailProps = {
  place: Place;
  titleId: string;
  /** "리뷰 더보기"를 눌러 리뷰가 늘어날 때 (시트를 크게 펼침) */
  onReviewsExpand: () => void;
};

/** 장소 상세. 이름·카테고리·영업 상태·주소·사진 1장·평점·리뷰를 한 번의 Google 요청으로 보여줌 */
export default function PlaceDetail({ place, titleId, onReviewsExpand }: PlaceDetailProps) {
  const { data, isPending, isError, refetch } = usePlaceDetailInfo(place.id);
  const [reviewsExpanded, setReviewsExpanded] = useState(false);
  const name = place.name ?? (data?.name || (isError ? UNKNOWN_PLACE_NAME : null));
  const hasReviews = data !== undefined && (data.rating !== null || data.reviews.length > 0);

  function handleRetry() {
    void refetch();
  }

  function handleReviewsExpand() {
    setReviewsExpanded(true);
    onReviewsExpand();
  }

  return (
    <div className="flex flex-col gap-6 text-text-primary">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-5 whitespace-nowrap">
          <h2 id={titleId} className="min-w-0 truncate text-xxl">
            {name ?? <Skeleton className="inline-block h-[1em] w-24 align-middle" />}
          </h2>
          {place.category && (
            <span className="shrink-0 text-m text-primary-800">
              {PLACE_CATEGORY_LABEL[place.category]}
            </span>
          )}
        </div>
        {isPending && (
          <>
            <Skeleton className="h-6.5 w-40" />
            <Skeleton className="h-6.5 w-60" />
          </>
        )}
        {data && (
          <>
            <PlaceOpenStatus openingHours={data.openingHours} />
            {data.address && <p className="text-s">{data.address}</p>}
          </>
        )}
      </div>
      {isPending && <Skeleton className="h-30 w-45" />}
      {isError && <ErrorState onRetry={handleRetry} />}
      {data && (
        <>
          <PlacePhoto photo={data.photo} placeName={name ?? UNKNOWN_PLACE_NAME} />
          {hasReviews && (
            <PlaceReviews
              rating={data.rating}
              reviews={data.reviews}
              expanded={reviewsExpanded}
              onExpand={handleReviewsExpand}
            />
          )}
        </>
      )}
    </div>
  );
}
