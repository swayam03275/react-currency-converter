import { useEffect, useState } from "react";

function useCurrencyinfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!currency) return;

    const date = "latest"; // You can replace this with a specific date if needed
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${currency}.json`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API Error: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        console.log("Fetched Data:", res);
        setData(res[currency] || {});
      })
      .catch((error) => console.error("API Fetch Error:", error));
  }, [currency]);

  return data;
}

export default useCurrencyinfo;
