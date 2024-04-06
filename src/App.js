import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import BaseCurrencySelector from "./components/BaseCurrencySelector";
import DateSelector from "./components/DateSelector";
import CurrencyTable from "./components/CurrencyTable";
import CurrencySelector from "./components/CurrencySelector";

const App = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [currencies, setCurrencies] = useState([
    "GBP",
    "EUR",
    "JPY",
    "CHF",
    "CAD",
    "AUD",
    "INR",
  ]);
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    "GBP",
    "EUR",
    "JPY",
    "CHF",
    "CAD",
    "AUD",
    "INR",
  ]);
  const [exchangeRates, setExchangeRates] = useState({});
  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in "YYYY-MM-DD" format
  const [selectedDate, setSelectedDate] = useState(currentDate );

  useEffect(() => {
    (async () => {
      const url = `https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_KzirWvqFV8hg6rrZ8WyN1YFywacMBiHq1EeF7457`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCurrencies(Object.keys(data?.data));
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    })();
  }, []);

  const lastSevenDays = useMemo(() => {
    const sevenDays = [];
    const date = new Date(selectedDate);
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(date);
      currentDate.setDate(date.getDate() - i);
      sevenDays.push(currentDate.toISOString().split("T")[0]);
    }
    console.log("lastSevenDays", sevenDays);
    return sevenDays;
  }, [selectedDate]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const promises = lastSevenDays.map(async (date, index) => {
        const url = `https://api.freecurrencyapi.com/v1/historical?base_currency=${baseCurrency}&date=${date}&apikey=fca_live_KzirWvqFV8hg6rrZ8WyN1YFywacMBiHq1EeF7457`;
        try {
          // Introduce a delay between API calls to avoid error from BE for 429error code
          await new Promise((resolve) => setTimeout(resolve, index * 1000)); // Adjust the delay as needed (here 1000 milliseconds = 1 second)

          const response = await fetch(url);
          const data = await response.json();
          console.log(" data?.[date]", data?.data[date], " ", date);
          return { [date]: data?.data[date] };
        } catch (error) {
          console.error("Error fetching exchange rates:", error);
          return { [date]: null }; // Handle error response
        }
      });

      try {
        const results = await Promise.all(promises);
        console.log("results", results);
        const mergedRates = results.reduce((acc, result) => {
          return { ...acc, ...result };
        }, {});
        console.log("mergedRates", mergedRates);
        setExchangeRates(mergedRates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };
    fetchExchangeRates();
  }, [baseCurrency, lastSevenDays, selectedCurrencies]);

  const handleCurrencyChange = (e) => {
    setBaseCurrency(e.target.value);
  };

  const handleRemoveCurrency = (index) => {
    const newCurrencies = selectedCurrencies.filter((_, i) => i !== index);
    setSelectedCurrencies(newCurrencies);
  };

  const handleAddCurrency = (currency) => {
    if (
      selectedCurrencies.length < 7 &&
      !selectedCurrencies.includes(currency)
    ) {
      setSelectedCurrencies((prevSelectedCurrencies) => [
        ...prevSelectedCurrencies,
        currency,
      ]);
    }
  };

  const handleDateChange = (e) => {
    console.table([selectedDate, e.target.value]);
    if (e.target.value !== selectedDate) {
      setSelectedDate(e.target.value);
    }
  };

  return (
    <div className="rootClass">
      <h1>Exchange Rates</h1>
      <div className="rootHeader">
      <BaseCurrencySelector
        baseCurrency={baseCurrency}
        currencies={currencies}
        onCurrencyChange={handleCurrencyChange}
      />
      <DateSelector
        selectedDate={selectedDate}
        maxDate={currentDate}
        onDateChange={handleDateChange}
      />
      <CurrencySelector
        currencies={currencies}
        handleAddCurrency={handleAddCurrency}
      />
      </div>
      <CurrencyTable
        selectedCurrencies={selectedCurrencies}
        lastSevenDays={lastSevenDays}
        exchangeRates={exchangeRates}
        handleRemoveCurrency={handleRemoveCurrency}
      />
    </div>
  );
};

export default App;
