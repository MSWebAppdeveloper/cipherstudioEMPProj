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
      <DateRangePicker 
      ranges={[selectionRange]}
      onChange={handleSelect}
      moveRangeOnFirstSelection={false} // Disable auto-selection of date range on first click
      editableDateInputs={true} // Allow manual input of dates
      showDateDisplay={false} // Hide the date display below the calendar
      />
    </div>
  );
};

export default DateRangePickerComp;