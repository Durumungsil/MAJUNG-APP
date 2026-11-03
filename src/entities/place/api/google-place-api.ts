import { hasGooglePlacesConfig, loadGooglePlaces } from "@/shared/lib/google-maps";
import { PLACE_PHOTO_MAX_WIDTH_PX } from "../config/constants";
import type {
  OpeningPeriod,
  PlaceDetailInfo,
  PlaceDetails,
  PlaceOpeningHours,
  PlacePhoto,
  PlaceReview,
} from "../model/types";

/** 필요한 필드만 요청함. 필드마다 Google 요금이 따로 매겨짐 */
async function fetchGooglePlace(placeId: string, fields: string[]) {
  if (!hasGooglePlacesConfig()) throw new Error("Google Places API key is not configured");
  const { Place } = await loadGooglePlaces();
  const place = new Place({ id: placeId, requestedLanguage: "ko", requestedRegion: "kr" });
  await place.fetchFields({ fields });
  return place;
}

/** 장소 이름·좌표 (일정·룰렛 응답에 없는 정보) */
export async function fetchPlaceDetails(placeId: string): Promise<PlaceDetails> {
  const place = await fetchGooglePlace(placeId, ["displayName", "location"]);
  return {
    name: place.displayName ?? "",
    location: place.location?.toJSON() ?? null,
  };
}

/**
 * 상세 시트에 필요한 정보를 한 번에 받음 (요청을 나누면 건마다 과금됨).
 * 평점·리뷰는 Enterprise + Atmosphere 등급 필드
 */
const DETAIL_INFO_FIELDS = [
  "displayName",
  "location",
  "formattedAddress",
  "regularOpeningHours",
  "utcOffsetMinutes",
  "rating",
  "photos",
  "reviews",
];

function toPhoto(photo: google.maps.places.Photo | undefined): PlacePhoto | null {
  if (!photo) return null;
  return {
    url: photo.getURI({ maxWidth: PLACE_PHOTO_MAX_WIDTH_PX }),
    attributions: photo.authorAttributions.map((attribution) => ({
      name: attribution.displayName,
      uri: attribution.uri || null,
    })),
  };
}

function toOpeningHours(place: google.maps.places.Place): PlaceOpeningHours | null {
  const periods = place.regularOpeningHours?.periods;
  if (!periods) return null;
  return {
    periods: periods.map(({ open, close }): OpeningPeriod => ({
      open: { day: open.day, hour: open.hour, minute: open.minute },
      close: close && { day: close.day, hour: close.hour, minute: close.minute },
    })),
    utcOffsetMinutes: place.utcOffsetMinutes ?? null,
  };
}

/** 본문이 없는 리뷰(별점만 남긴 리뷰)는 보여줄 내용이 없어 뺌 */
function toReviews(reviews: google.maps.places.Review[] | undefined): PlaceReview[] {
  return (reviews ?? []).flatMap((review) =>
    review.text
      ? [
          {
            authorName: review.authorAttribution?.displayName ?? "",
            authorUri: review.authorAttribution?.uri || null,
            relativeTime: review.relativePublishTimeDescription,
            text: review.text,
          },
        ]
      : [],
  );
}

/** 상세 시트용 장소 정보 (이름·좌표·주소·영업시간·평점·사진 1장·리뷰) */
export async function fetchPlaceDetailInfo(placeId: string): Promise<PlaceDetailInfo> {
  const place = await fetchGooglePlace(placeId, DETAIL_INFO_FIELDS);
  return {
    name: place.displayName ?? "",
    location: place.location?.toJSON() ?? null,
    address: place.formattedAddress ?? null,
    rating: place.rating ?? null,
    openingHours: toOpeningHours(place),
    photo: toPhoto(place.photos?.[0]),
    reviews: toReviews(place.reviews),
  };
}
