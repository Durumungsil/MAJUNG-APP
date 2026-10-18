import type { LatLngLiteral } from "@/shared/model/lat-lng";

const METERS_PER_DEGREE_LAT = 111_320;

export function offsetLatLng(
  origin: LatLngLiteral,
  northMeters: number,
  eastMeters: number,
): LatLngLiteral {
  const metersPerDegreeLng = METERS_PER_DEGREE_LAT * Math.cos((origin.lat * Math.PI) / 180);
  return {
    lat: origin.lat + northMeters / METERS_PER_DEGREE_LAT,
    lng: origin.lng + eastMeters / metersPerDegreeLng,
  };
}
