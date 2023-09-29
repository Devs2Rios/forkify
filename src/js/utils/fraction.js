export const fraction = decimal => {
  const wholePart = Math.floor(decimal);
  const fractionalPart = decimal - wholePart;
  const maxIterations = 10000;
  let numerator = Math.round(fractionalPart * maxIterations);
  let denominator = maxIterations;
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const commonDivisor = gcd(numerator, denominator);
  numerator /= commonDivisor;
  denominator /= commonDivisor;
  let fractionStr = '';
  if (wholePart > 0) {
    fractionStr += wholePart + ' ';
  }
  if (numerator > 0) {
    fractionStr += numerator + '/' + denominator;
  }
  return fractionStr || '0';
};
