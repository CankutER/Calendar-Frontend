import { months, Month, Day } from "./utils/timeUtils";
import { createContext, ReactElement, useContext, useState } from "react";
export interface Event {
  userName: string;
  eventId: string;
  year: string;
  month: Month;
  day: string;
  event: string;
}
interface IUserContext {
  selectedYear: string;
  selectedMonth: Month;
  events: Event[];
}
interface EventModalState {
  displayed: boolean;
  content: Event | null;
}
interface AddModalState {
  day: string;
  displayed: boolean;
}

const useCalendarContext = (initState: IUserContext) => {
  const [state, setState] = useState<IUserContext>(initState);
  const [eventModal, setEventModal] = useState<EventModalState>({
    displayed: false,
    content: null,
  });
  const [addEventModal, setAddEventModal] = useState<AddModalState>({
    day: "",
    displayed: false,
  });
  const handleState = (arg: IUserContext) => {
    setState(arg);
  };
  const handleEventModal = (arg: EventModalState) => {
    setEventModal(arg);
  };
  const handleAddEventModal = (arg: AddModalState) => {
    setAddEventModal(arg);
  };
  return {
    state,
    handleState,
    eventModal,
    handleEventModal,
    addEventModal,
    handleAddEventModal,
  };
};

const initialState: IUserContext = {
  selectedYear: new Date().getFullYear().toString(),
  selectedMonth: months[new Date().getMonth()],
  events: [],
};
const UserContext = createContext<ReturnType<typeof useCalendarContext>>({
  state: initialState,
  handleState: (initialState: IUserContext) => {},
  eventModal: {
    displayed: false,
    content: null,
  },
  addEventModal: { day: "", displayed: false },
  handleAddEventModal: (arg: AddModalState) => {},
  handleEventModal: (arg: EventModalState) => {},
});
type ChildrenType = {
  children?: ReactElement | undefined;
};

export const UserContextProvider = ({ children }: ChildrenType) => {
  const {
    state,
    handleState,
    addEventModal,
    eventModal,
    handleAddEventModal,
    handleEventModal,
  } = useCalendarContext(initialState);
  return (
    <UserContext.Provider
      value={{
        state,
        handleState,
        addEventModal,
        eventModal,
        handleAddEventModal,
        handleEventModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(UserContext);
};
