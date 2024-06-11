import React from "react";

interface DateRangePickerCompProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date | null, Date | null]) => void;
}

const DateRangePickerComp: React.FC<DateRangePickerCompProps> = ({
  startDate,
  endDate,
  onChange,
}) => {
  return (
    <div className="py-4">
      <input
        type="date"
        value={startDate ? startDate.toISOString().split("T")[0] : ""}
        onChange={(e) => onChange([new Date(e.target.value), endDate])}
      />
      <input
        type="date"
        value={endDate ? endDate.toISOString().split("T")[0] : ""}
        onChange={(e) => onChange([startDate, new Date(e.target.value)])}
      />
    </div>
  );
};

export default DateRangePickerComp;
