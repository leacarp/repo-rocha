export function useCurrencify(amount) {
  /* formato para mostrar moneda: "+ $1,000.00" | "- $1,000.00" */
  let posNegSymbol = ''
  if (amount > 0) posNegSymbol = '+'
  else if (amount < 0) posNegSymbol = '-'

  const currencySimbol = '$',
    amountPositive = Math.abs(amount),
  /* traemos el valor amount y lo convertimos a string de USA y la damos un minimo y maximode 2 decimales*/
  amountFormatted = amountPositive.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return `${posNegSymbol} ${currencySimbol} ${amountFormatted}`
}
