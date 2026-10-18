import Image from "next/image";
import currentLocationMarker from "./current-location-marker.svg";

export default function CurrentLocationMarker() {
  return <Image src={currentLocationMarker} alt="현재 위치" />;
}
