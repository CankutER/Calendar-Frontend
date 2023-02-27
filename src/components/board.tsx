import { ReactElement } from "react";
import { useGlobalContext } from "../context";
import { buildCalendar } from "../utils/buildBoard";
import { Box } from "./box";
import { convertEventsToMap } from "../utils/convertToMap";
import { Event } from "../context";

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
