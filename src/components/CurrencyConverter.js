import React from "react";
import "./CurrencyConverter.css";

export default function CurrencyConverter(props) {
    console.log('======= CurrencyConverter Component First Line =======');
  const {
    currencyList,
    selectedCurrency,
    onAmountChange,
    amount,
    onChangeCurrency,
  } = props;

  const currencyOptions = currencyList.rates;
  console.log(`currencyList.rates`, currencyList.rates);
  console.log(`CurrencyConverter amount`, amount);
  return (
    <div className="currency-fields">
      <input
        type="number"
        className="from-currency"
        value={amount}
        onChange={onAmountChange}
      />
      <select
        value={selectedCurrency}
        className="from-currency"
        onChange={onChangeCurrency}
      >
        {Object.keys(currencyOptions).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
}
