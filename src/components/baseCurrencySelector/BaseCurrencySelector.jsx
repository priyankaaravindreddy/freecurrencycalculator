import React from 'react';

const BaseCurrencySelector = ({ baseCurrency, currencies, onCurrencyChange }) => {
  return (
    <div>
      <label htmlFor="baseCurrency">Base Currency:</label>
      <select
        id="baseCurrency"
        value={baseCurrency}
        onChange={onCurrencyChange}
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

export default BaseCurrencySelector;