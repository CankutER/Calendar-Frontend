import { ReactElement } from "react";
import { useGlobalContext } from "../context";
import { buildCalendar } from "../utils/buildBoard";
import { Box } from "./box";
import { convertEventsToMap } from "../utils/convertToMap";
import { Event } from "../context";
import { days } from "../utils/timeUtils";

export const Board = (): ReactElement => {
  const { state, handleState } = useGlobalContext();

  const monthCalendar: Date[] = buildCalendar(
    state.selectedMonth,
    state.selectedYear
  );

  const eventsMap = convertEventsToMap(state.events);
  console.log(eventsMap);

  return (
    <section className="container main-board">
      {days.map((day, i) => {
        if (i !== days.length - 1) {
          return (
            <h4 key={i} className="text-capitalize text-center">
              {days[i + 1]}
            </h4>
          );
        } else {
          return (
            <h4 key={i} className="text-capitalize text-center">
              {days[0]}
            </h4>
          );
        }
      })}
      {monthCalendar.map((box, i) => {
        return (
          <Box
            key={i}
            box={box}
            events={(eventsMap[box.getDate().toString()] as Event[]) || null}
          ></Box>
        );
      })}
    </section>
  );
};
