import { ReactElement, useRef, useState } from "react";
import { useGlobalContext } from "../context";
import { getToken, getUserName } from "../utils/getSessionInfo";
import { API_URL } from "../pages/userPage";
import { Month } from "../utils/timeUtils";

interface EventBodyType {
  userName: string;
  year: string;
  month: Month;
  day: string;
  event: string;
}
export const AddEventModal = (): ReactElement => {
  const { addEventModal, handleAddEventModal, state, handleState } =
    useGlobalContext();
  const [inputState, setInputState] = useState<string>("");

  const addEventHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const token = await getToken();
    const username = await getUserName();
    const eventBody: EventBodyType = {
      day: addEventModal.day,
      event: JSON.stringify(inputState) as string,
      month: state.selectedMonth,
      year: state.selectedYear,
      userName: username,
    };

    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventBody),
      });
      const result = await response.json();
      console.log(result);

      const newEvents = [
        ...state.events,
        {
          ...eventBody,
          eventId: result.slice(26),
        },
      ];

      handleState({ ...state, events: newEvents });
      handleAddEventModal({ ...addEventModal, displayed: false });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="calendar-modal event-modal position-absolute w-100 h-100 top-0 d-grid align-items-center  z-2 bg-body-secondary bg-opacity-75">
      <div className="modal-info w-50 h-50 m-auto d-grid align-content-center ">
        <div className="mb-3">
          <label htmlFor="event" className="form-label">
            Detail
          </label>
          <input
            type="text"
            className="form-control"
            name="event"
            id="event"
            onChange={(e) => {
              setInputState(e.target.value);
            }}
            value={inputState}
          />
        </div>
        <div className="button-container d-flex">
          <button className="btn btn-primary" onClick={addEventHandler}>
            Add Event
          </button>

          <button
            className="btn btn-dark"
            onClick={() => {
              handleAddEventModal({ ...addEventModal, displayed: false });
            }}
          >
            Close
          </button>
        </div>
      </div>
    </section>
  );
};
