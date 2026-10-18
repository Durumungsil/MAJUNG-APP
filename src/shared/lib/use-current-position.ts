"use client";

import { useEffect, useState } from "react";
import type { LatLngLiteral } from "@/shared/model/lat-lng";

export type CurrentPositionStatus = "pending" | "granted" | "denied" | "unavailable";

interface CurrentPositionState {
  position: LatLngLiteral | null;
  status: CurrentPositionStatus;
}

const WATCH_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 10_000,
  timeout: 15_000,
};

function getInitialState(): CurrentPositionState {
  const isSupported = typeof navigator === "undefined" || "geolocation" in navigator;
  return { position: null, status: isSupported ? "pending" : "unavailable" };
}

export function useCurrentPosition(): CurrentPositionState {
  const [state, setState] = useState<CurrentPositionState>(getInitialState);

  useEffect(() => {
    if (!("geolocation" in navigator)) return;

    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        setState({ position: { lat: coords.latitude, lng: coords.longitude }, status: "granted" });
      },
      (error) => {
        setState((prev) => ({
          position: prev.position,
          status: error.code === error.PERMISSION_DENIED ? "denied" : "unavailable",
        }));
      },
      WATCH_OPTIONS,
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return state;
}
