import { hasGooglePlacesConfig, loadGooglePlaces } from "@/shared/lib/google-maps";
import { PLACE_PHOTO_MAX_WIDTH_PX } from "../config/constants";
import type { PlaceDetails, PlacePhoto } from "../model/types";

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

/** 상세 화면용 사진 1장과 작성자 출처. 사진이 없으면 null */
export async function fetchPlacePhoto(placeId: string): Promise<PlacePhoto | null> {
  const place = await fetchGooglePlace(placeId, ["photos"]);
  const photo = place.photos?.[0];
  if (!photo) return null;
  return {
    url: photo.getURI({ maxWidth: PLACE_PHOTO_MAX_WIDTH_PX }),
    attributions: photo.authorAttributions.map((attribution) => ({
      name: attribution.displayName,
      uri: attribution.uri || null,
    })),
  };
}
