import React from "react";
import styles from"./CurrencyTable.module.css";

const CurrencyTable = ({
  selectedCurrencies,
  lastSevenDays,
  exchangeRates,
  handleRemoveCurrency,
}) => {
  return (
    <div className={styles["currency-table-container"]}>
      <div className={styles["currency-table"]}>
        <div className={styles.header}>
          <div>Currency</div>
          <div>Exchange Rate</div>
          <div>Action</div>
        </div>
        <div className={styles.body}>
          {selectedCurrencies.map((currency, index) => (
            <div key={currency} className={styles.row}>
              <div className={styles.currency}>{currency}</div>
              <div className={styles["exchange-rate-list"]}>
                {lastSevenDays.map((date) => (
                  <div key={date} className={styles["exchange-rate"]}>
                    <span className={styles.date}>{date}</span>
                    <span className={styles.rate}>
                      {exchangeRates[date]?.[currency]}
                    </span>
                  </div>
                ))}
              </div>
              <button
                className={`${styles["remove-button"]} ${
                  selectedCurrencies.length === 3 ? styles["disabled"] : ""
                }`}
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
