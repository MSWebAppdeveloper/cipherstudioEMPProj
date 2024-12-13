import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangePickerComp = ({ onChange }) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges) => {
    const { selection } = ranges;
    setSelectionRange(selection);
    if (onChange) {
      onChange({
        startDate: new Date(selection.startDate.setHours(0, 0, 0, 0)),
        endDate: new Date(selection.endDate.setHours(23, 59, 59, 999)),
      });
    }
  };

  return (
    <div className="calendarElement">
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        editableDateInputs={true}
        showDateDisplay={false}
      />
    </div>
  );
};

export default DateRangePickerComp;
