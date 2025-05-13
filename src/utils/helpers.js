export function countCapitalizedWords(text) {
  return text.split(/\s+/).filter((word) => /^[A-Z]/.test(word)).length;
}

export function isYearEven(year) {
  return parseInt(year) % 2 === 0;
}
