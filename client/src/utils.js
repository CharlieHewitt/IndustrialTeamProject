export function getNumberSuffix(number) {
  if (number % 10 <= 1) return "ST";
  if (number % 10 == 2) return "ND";
  if (number % 10 == 3) return "RD";
  return "TH";
}
