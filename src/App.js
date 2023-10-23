import "./styles.css";
import { useEffect, useState } from "react";
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [amount, setAmount] = useState(1);
  const [currencyTo, setCurrencyTo] = useState("EUR");
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCurrency = async () => {
      setIsLoading(true);
      const result = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`
      );
      console.log(result);
      const data = await result.json();
      console.log(data);
      const converted = (data.amount * data.rates[currencyTo]).toFixed(2);
      setResult(converted);
      setIsLoading(false);
    };
    if (currencyFrom === currencyTo || amount === 0) {
      setResult(amount);
      return;
    }
    fetchCurrency();
  }, [amount, currencyFrom, currencyTo]);
  return (
    <div className="App">
      <Form
        amount={amount}
        setAmount={setAmount}
        currencyTo={currencyTo}
        setCurrencyTo={setCurrencyTo}
        currencyFrom={currencyFrom}
        setCurrencyFrom={setCurrencyFrom}
      />
      <Output>{isLoading ? "loading..." : `${result} ${currencyTo}`}</Output>
    </div>
  );
}

const Form = ({
  amount,
  setAmount,
  currencyTo,
  setCurrencyTo,
  currencyFrom,
  setCurrencyFrom
}) => {
  return (
    <>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select
        value={currencyFrom}
        onChange={(e) => setCurrencyFrom(e.target.value)}
        className="form-select"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={currencyTo}
        onChange={(e) => setCurrencyTo(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
    </>
  );
};

const Output = ({ children }) => {
  return <h1>{children}</h1>;
};
