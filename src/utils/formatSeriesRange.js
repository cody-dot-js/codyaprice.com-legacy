import numberToWords from "./numberToWords"

export default function formatSeriesRange(number, total) {
  const parsedNumber = parseInt(number, 10)
  const parsedTotal = parseInt(total, 10)
  const seriesNumber = parsedNumber >= 1 ? parsedNumber : 1
  const part = numberToWords(seriesNumber)
  const max = numberToWords(parsedTotal)

  return `Part ${part} of ${max}`
}
