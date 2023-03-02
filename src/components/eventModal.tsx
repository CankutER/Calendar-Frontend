import { ReactElement, useRef, useState } from "react";
import { useGlobalContext } from "../context";
import { getToken, getUserName } from "../utils/getSessionInfo";
import { API_URL } from "../pages/userPage";
export const EventModal = (): ReactElement => {
  const { handleEventModal, eventModal, state, handleState } =
    useGlobalContext();
  const [inputState, setInputState] = useState<string | undefined>(
    JSON.parse(eventModal.content?.event as string)
  );

  const updateEventHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const token = await getToken();
    const username = await getUserName();

    try {
      const response = await fetch(
        `${API_URL}?userName=${username}&eventId=${eventModal.content?.eventId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputState),
        }
      );
      const result = await response.json();
      const newEvents = state.events.map((event) => {
        if (event.eventId === eventModal.content?.eventId) {
          event.event = JSON.stringify(inputState) as string;
        }
        return event;
      });
      handleState({ ...state, events: newEvents });
      handleEventModal({ ...eventModal, displayed: false });
    } catch (err) {
      console.log(err);
    }
  };
  const deleteEventHandler = async () => {
    const token = await getToken();
    const username = await getUserName();

    try {
      const response = await fetch(
        `${API_URL}?userName=${username}&eventId=${eventModal.content?.eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      const newEvents = state.events.filter(
        (event) => event.eventId !== eventModal.content?.eventId
      );
      handleState({ ...state, events: newEvents });
      handleEventModal({ ...eventModal, displayed: false });
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
          <button className="btn btn-primary" onClick={updateEventHandler}>
            Update Event
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteEventHandler();
            }}
          >
            Delete Item
          </button>
          <button
            className="btn btn-dark"
            onClick={() => {
              handleEventModal({ ...eventModal, displayed: false });
            }}
          >
            Close
          </button>
        </div>
      </div>
    </section>
  );
};
