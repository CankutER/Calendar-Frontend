import { ReactElement } from "react";
import { useGlobalContext } from "../context";
import { months } from "../utils/timeUtils";
import { Event } from "../context";
interface BoxProps {
  box: Date;
  events: Event[] | null;
}

export const Box = ({ box, events }: BoxProps): ReactElement => {
  const { state, handleState } = useGlobalContext();

  return (
    <div
      className={`box ${
        state.selectedMonth !== months[box.getMonth()]
          ? "bg-body-secondary"
          : ""
      }`}
    >
      <p className="date-info">{box.getDate()}</p>
      <div className="text-center d-grid">
        {events?.map((event) => {
          return (
            <p key={event.eventId} className="single-event">
              {event.event}
            </p>
          );
        })}
      </div>
    </div>
  );
};
