import "./App.css";
import CurrencyConverter from "./components/CurrencyConverter";
import { useEffect, useState } from "react";
import currencyList from "./currency.json";

const BASE_URL = "https://api.apilayer.com/exchangerates_data/latest";
//const BASE_CONVERT_URL = "https://api.apilayer.com/exchangerates_data/convert";
const API_KEY = "XeUuoxwcuX3co9fNZWcs2N2Nd6a5syQI";

function App(props) {
  console.log('======= App Component First Line =======');
  
  const [currencyOptions, setCurrencyOptions] = useState();
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState();
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  console.log(`amount After component Renders => `, amount);
  console.log(`currencyOptions `, currencyOptions);
  console.log(`exchangeRate `, exchangeRate);
  console.log(`amountInFromCurrency `, amountInFromCurrency);


  const myHeaders = new Headers();
  myHeaders.append("apikey", API_KEY);
  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  let fromAmount, toAmount;
  if (amountInFromCurrency) {
    //fromAmount = amount +1;
    //toAmount = amount * exchangeRate;
    //toAmount = amount +1;
  } else {
    //toAmount = amount + 1;
    //fromAmount = amount + 1;
    //fromAmount = amount / exchangeRate;
  }

  console.log(`fromAmount `, fromAmount);
  console.log(`toAmount `, toAmount);

  useEffect(() => {
    console.log('------------- runnign useEffect ---------------')
    let firstCurrency = Object.keys(currencyList.rates)[0];
    setCurrencyOptions(currencyList);
    setFromCurrency(currencyList.base);
    setToCurrency(firstCurrency);
    setExchangeRate(currencyList.rates[firstCurrency]);
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(
        BASE_URL + `?base=${fromCurrency}&symbols=${toCurrency}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]))
        .catch((error) => console.error(error));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    //setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    //setAmount(e.target.value);
    //setAmountInFromCurrency(true);
  }


  return (
    <div className="App">
      <header className="App-header">
        <div className="currency-converter-container">
          {currencyOptions && (
            <CurrencyConverter
              currencyList={currencyOptions}
              selectedCurrency={fromCurrency}
              onChangeCurrency={(e)=> setFromCurrency(e.target.value)}
              amount={fromAmount}
              onAmountChange={handleFromAmountChange}
            />
          )}
          <div className="equals"> = </div>
          {currencyOptions && (
            <CurrencyConverter
              currencyList={currencyOptions}
              selectedCurrency={toCurrency}
              onChangeCurrency={(e) => setToCurrency(e.target.value)}
              amount={toAmount}
              onAmountChange={handleToAmountChange}
            />
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
