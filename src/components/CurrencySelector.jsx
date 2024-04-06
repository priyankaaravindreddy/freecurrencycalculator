import React from 'react';

const CurrencySelector = ({ currencies, handleAddCurrency }) => {
  return (
    <div>
      <label htmlFor="newCurrency">Add Currency:</label>
      <select
        id="newCurrency"
        onChange={(e) => handleAddCurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;