import num2words from "num-words"

export default function convertNumberToWords(
  number = 0,
  { capitalize = true } = {}
) {
  return capitalize
    ? num2words(number)
        .split(" ")
        .map(word => word[0].toUpperCase().concat(word.slice(1)))
        .join(" ")
    : num2words(number)
}
