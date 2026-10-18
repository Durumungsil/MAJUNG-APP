import type { TRANSPORT_OPTIONS, TRAVEL_STYLE_OPTIONS } from "../config/options";

export type Transport = (typeof TRANSPORT_OPTIONS)[number]["value"];
export type TravelStyle = (typeof TRAVEL_STYLE_OPTIONS)[number]["value"];

export type FoodPreference = {
  key: string;
  name: string;
  /** 0 = 미선택, 1 ~ MAX_FOOD_RATING */
  rating: number;
};
