import { useState, useEffect } from "react";
import { InputBox } from "./assets/components";
import useCurrencyinfo from "./hooks/useCurrencyinfo";

function App() {
  const [amount, SetAmount] = useState("");
  const [from, SetFrom] = useState("usd");
  const [to, SetTo] = useState("inr");
  const [convertedamount, SetConvertedAmount] = useState("");

  const currencyInfo = useCurrencyinfo(from);
  const options = currencyInfo ? Object.keys(currencyInfo) : [];

  useEffect(() => {
    console.log("Currency Data:", currencyInfo); // Debugging API response
  }, [currencyInfo]);

  const swap = () => {
    SetFrom(to);
    SetTo(from);
    SetAmount(convertedamount ? Number(convertedamount) : "");
    SetConvertedAmount(amount ? Number(amount) : "");
  };

  const convert = () => {
    if (currencyInfo && currencyInfo[to]) {
      SetConvertedAmount(amount ? amount * currencyInfo[to] : "");
    }
  };

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-gradient-to-r from-purple-500 to-blue-500 text-white">
      <div className="w-full max-w-md mx-auto border border-gray-300 rounded-lg p-6 backdrop-blur-sm bg-white/20 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-white">
          Currency Converter
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="w-full mb-3">
            <InputBox
              label="From"
              amount={amount}
              onAmountChange={(newAmount) =>
                SetAmount(newAmount === "" ? "" : Number(newAmount))
              }
              currencyoption={options}
              onCurrencyChange={(currency) => SetFrom(currency)}
              selectCurrency={from}
            />
          </div>

          <div className="relative w-full flex justify-center my-2">
            <button
              type="button"
              className="bg-white text-blue-600 font-semibold px-3 py-1 rounded-lg shadow-md hover:bg-blue-100"
              onClick={swap}
            >
              Swap
            </button>
          </div>

          <div className="w-full mb-4">
            <InputBox
              label="To"
              amount={convertedamount}
              currencyoption={options}
              onCurrencyChange={(currency) => SetTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-blue-600 font-semibold px-4 py-3 rounded-lg shadow-md hover:bg-blue-100"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;  