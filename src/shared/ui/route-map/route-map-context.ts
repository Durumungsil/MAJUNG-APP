"use client";

import { createContext, useContext } from "react";
import type { LoadedGoogleMap } from "@/shared/lib/use-google-map";

export const RouteMapContext = createContext<LoadedGoogleMap | null>(null);

export function useRouteMapContext(): LoadedGoogleMap {
  const value = useContext(RouteMapContext);
  if (!value) throw new Error("RouteMap 안에서만 사용할 수 있어요");
  return value;
}
