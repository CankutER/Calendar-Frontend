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

const useCalendarContext = (initState: IUserContext) => {
  const [state, setState] = useState<IUserContext>(initState);
  const handleState = (arg: IUserContext) => {
    setState(arg);
  };
  return { state, handleState };
};

const initialState: IUserContext = {
  selectedYear: new Date().getFullYear().toString(),
  selectedMonth: months[new Date().getMonth()],
  events: [],
};
const UserContext = createContext<ReturnType<typeof useCalendarContext>>({
  state: initialState,
  handleState: (initialState) => {},
});
type ChildrenType = {
  children?: ReactElement | undefined;
};

export const UserContextProvider = ({ children }: ChildrenType) => {
  const { state, handleState } = useCalendarContext(initialState);
  return (
    <UserContext.Provider value={{ state, handleState }}>
      {children}
    </UserContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(UserContext);
};
