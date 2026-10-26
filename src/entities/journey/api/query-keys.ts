export const journeyKeys = {
  all: ["journeys"] as const,
  itinerary: (groupId: number, itineraryId: number) =>
    [...journeyKeys.all, "itinerary", groupId, itineraryId] as const,
};
