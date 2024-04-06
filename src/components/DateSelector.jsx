import React from 'react';

const DateSelector = ({ selectedDate, maxDate, onDateChange }) => {
  return (
    <div>
      <label htmlFor="date">Select Date:</label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        max={maxDate}
        onChangeCapture={onDateChange}
      />
    </div>
  );
};

export default DateSelector;