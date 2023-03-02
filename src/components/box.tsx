import { ReactElement, useState } from "react";
import { useGlobalContext } from "../context";
import { months } from "../utils/timeUtils";
import { Event } from "../context";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { EventModal } from "./eventModal";
import { SingleEvent } from "./event";
interface BoxProps {
  box: Date;
  events: Event[] | null;
}

export const Box = ({ box, events }: BoxProps): ReactElement => {
  const { state, handleState, addEventModal, handleAddEventModal } =
    useGlobalContext();

  const openAddModal = () => {
    handleAddEventModal({ day: box.getDate().toString(), displayed: true });
  };

  return (
    <div
      className={`box ${
        state.selectedMonth !== months[box.getMonth()]
          ? "bg-body-secondary"
          : ""
      }`}
    >
      <p className="date-info d-flex justify-content-between align-items-center">
        <span className="box-date"> {box.getDate()}</span>

        <AiOutlinePlusSquare onClick={openAddModal} />
      </p>
      <div className="text-center d-grid">
        {months[box.getMonth()] === state.selectedMonth &&
          events?.map((event) => {
            return (
              <SingleEvent key={event.eventId} event={event}></SingleEvent>
            );
          })}
      </div>
    </div>
  );
};
