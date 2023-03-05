import { ReactElement } from "react";
import { useGlobalContext } from "../context";
import { months, Month, Day, years } from "../utils/timeUtils";

export const DateSelection = (): ReactElement => {
  const { state, handleState } = useGlobalContext();
  return (
    <div className="d-flex justify-content-center">
      {/* YEARS */}
      <select
        name="years"
        id="years"
        className="form-select w-25"
        value={state.selectedYear}
        onChange={(e) => {
          handleState({ ...state, selectedYear: e.target.value, events: [] });
        }}
      >
        {years.map((year, i) => (
          <option key={i}>{year}</option>
        ))}
      </select>
      {/*  */}
      {/* MONTHS */}
      <select
        name="months"
        id="months"
        className="form-select w-25"
        value={state.selectedMonth}
        onChange={(e) => {
          handleState({
            ...state,
            selectedMonth: e.target.value as Month,
            events: [],
          });
        }}
      >
        {months.map((year, i) => (
          <option key={i}>{year}</option>
        ))}
      </select>

      {/*  */}
    </div>
  );
};
