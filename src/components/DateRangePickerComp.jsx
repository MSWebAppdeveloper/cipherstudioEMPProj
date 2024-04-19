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
    setSelectionRange(ranges.selection);
    onChange && onChange(ranges.selection);
  };

  
  return (
    <div className="calendarElement">
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
    </div>
  );
};

export default DateRangePickerComp;