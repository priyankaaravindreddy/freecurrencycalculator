import React from 'react';
import './CurrencyTable.css';

const CurrencyTable = ({ selectedCurrencies, lastSevenDays, exchangeRates, handleRemoveCurrency }) => {
  return (
    <div className="currency-table-container">
      <div className="currency-table">
        <div className="header">
          <div>Currency</div>
          <div>Exchange Rate</div>
          <div>Action</div>
        </div>
        <div className="body">
          {selectedCurrencies.map((currency, index) => (
            <div key={currency} className="row">
              <div className="currency">{currency}</div>
              <div className="exchange-rate-list">
                {lastSevenDays.map((date) => (
                  <div key={date} className="exchange-rate">
                    <span className="date">{date}</span>
                    <span className="rate">{exchangeRates[date]?.[currency]}</span>
                  </div>
                ))}
              </div>
              <button
                className="remove-button"
                disabled={selectedCurrencies.length === 3}
                onClick={() => handleRemoveCurrency(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencyTable;