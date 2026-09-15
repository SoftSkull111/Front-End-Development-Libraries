const { useState, useMemo } = React;

export function CurrencyConverter() {
  const currencyMapping = {
    "USD": 1,
    "EUR": 0.92,
    "GBP": 0.78,
    "JPY": 156.7
  };
  const [amount, setAmount] = useState(0)
  const [startCurrency, setStartCurrency] = useState(Object.keys(currencyMapping)[0]);
  const [targetCurrency, setTargetCurrency] = useState(Object.keys(currencyMapping)[0]);
  const handleAmountChange = (e) => {
    if (e.target.value >= 0) setAmount(e.target.value);
    else setAmount(0);
  }
  const handleStartChange = (e) => {
    setStartCurrency(e.target.value);
  }
  const handleTargetChange = (e) => {
    setTargetCurrency(e.target.value);
  }
  const calculatedAmount = useMemo(() => {
    const calculatedCurrency = {};
    Object.entries(currencyMapping).forEach(([key, value]) => {
      calculatedCurrency[key] = (value/currencyMapping[startCurrency]*amount).toFixed(2)
    });
    return (calculatedCurrency);
  }, [startCurrency, amount])
  return (
    <>
      <h1>Currency Converter</h1>
      <h2>USD to EUR Conversion</h2>
      <input type="number" value={amount} onChange={(e)=>handleAmountChange(e)}/>
      <h2>Start Currency:</h2>
      <select value={startCurrency} onChange={(e) => handleStartChange(e)}>
      {Object.keys(currencyMapping).map((key)=><option key={`start-${key}`}>{key}</option>)}
      </select>
      <h2>Target Currency:</h2>
      <select value={targetCurrency} onChange={(e) => handleTargetChange(e)}>
      {Object.keys(currencyMapping).map((key)=><option key={`target-${key}`}>{key}</option>)}
      </select>
      <h3>Converted Amount: {calculatedAmount[targetCurrency]} {targetCurrency}</h3>
    </>
  )
}