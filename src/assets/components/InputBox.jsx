import { useId } from "react";
import PropTypes from "prop-types";

function InputBox({
  label,
  onAmountChange,
  amount,
  onCurrencyChange,
  currencyoption = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) {
  const amountInputId = useId();
  return (
    <div className={`bg-blue-100 p-4 rounded-lg text-sm flex items-center shadow-md ${className}`}>
      <div className="w-1/2">
        <label htmlFor={amountInputId} className="text-gray-700 font-semibold mb-2 inline-block">{label}</label>
        <input
          id={amountInputId}
          className="outline-none w-full bg-white py-2 px-3 rounded-md border border-gray-300 text-gray-900 font-medium"
          type="number"
          placeholder="Enter amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-gray-700 font-semibold mb-2 w-full">Currency Type</p>
        <select
          className="rounded-md px-3 py-2 bg-white border border-gray-300 cursor-pointer outline-none text-gray-900 font-medium"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyoption.map((currency) => (
            <option key={currency} value={currency} className="text-gray-900">
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

InputBox.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
  currencyoption: PropTypes.arrayOf(PropTypes.string),
  selectCurrency: PropTypes.string,
  amountDisable: PropTypes.bool,
  currencyDisable: PropTypes.bool,
  amount: PropTypes.number,
};

export default InputBox;
