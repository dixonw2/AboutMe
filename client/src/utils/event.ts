import type { Event } from "@/types/events/Event";

const getSeason = (date: string) => {
  // getMonth() is zero based
  const month = new Date(date).getMonth() + 1;

  if ([12, 1, 2].includes(month)) return "Winter";
  if ([3, 4, 5].includes(month)) return "Spring";
  if ([6, 7, 8].includes(month)) return "Summer";
  if ([9, 10, 11].includes(month)) return "Fall";
  return "Donde Esta El Montho?";
};

const getYear = (date: string) => {
  return new Date(date).getFullYear() % 100;
};

const getEventName = (event: Event) => {
  return (
    event.eventName ||
    `${event.headliner} ${getSeason(event.date)} '${getYear(event.date)}`
  );
};

export { getEventName };
