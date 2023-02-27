import { Event } from "../context";

export const convertEventsToMap = (events: Event[]) => {
  const eventsMap: { [key: string]: Array<Event> } = {};
  events.forEach((event) => {
    if (!eventsMap[event.day]) {
      eventsMap[event.day] = [];
      eventsMap[event.day].push(event);
    } else {
      eventsMap[event.day].push(event);
    }
  });
  return eventsMap;
};
