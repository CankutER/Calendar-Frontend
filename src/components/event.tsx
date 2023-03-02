import { ReactElement, useState } from "react";
import { Event, useGlobalContext } from "../context";
import { EventModal } from "./eventModal";
interface SingleEventProps {
  event: Event;
}
export const SingleEvent = ({ event }: SingleEventProps): ReactElement => {
  const { handleEventModal } = useGlobalContext();
  return (
    <>
      <p
        key={event.eventId}
        className="single-event"
        onClick={() => {
          handleEventModal({ content: event, displayed: true });
        }}
      >
        {JSON.parse(event.event)}
      </p>
    </>
  );
};
