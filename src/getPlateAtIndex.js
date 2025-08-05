/**
 * Returns the license plate string at the given index `n` in a custom sequence.
 *
 * The sequence generates 6-character license plates where digits come first,
 * followed by letters, following this pattern:
 * 000000, 000001, ..., 999999, 00000A, 00001A, ..., 99999A, 00000B, ...
 * up to ZZZZZZ.
 *
 * @param {number} n - Non-negative integer index of the plate in the sequence
 * @returns {string} The license plate string at index n
 * @throws {Error} If n is negative or not an integer
 */
function getPlateAtIndex(n) {
  const DIGITS = '0123456789';
  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Convert a number to a custom base with left zero padding
  function toBase(value, charset, length) {
    const base = charset.length;
    let result = '';

    do {
      result = charset[value % base] + result;
      value = Math.floor(value / base);
    } while (value > 0);

    while (result.length < length) {
      result = charset[0] + result;
    }

    return result;
  }

  if (!Number.isInteger(n) || n < 0) {
    throw new Error('Invalid index: must be a non-negative integer');
  }

  const TOTAL_DIGIT_ONLY = 10 ** 6; // 000000 to 999999

  if (n < TOTAL_DIGIT_ONLY) {
    return toBase(n, DIGITS, 6);
  }

  let remaining = n - TOTAL_DIGIT_ONLY;
  let letterCount = 1;
  let groupSize = 10 ** (6 - letterCount) * 26 ** letterCount;

  // Find how many letters the plate should have
  while (remaining >= groupSize) {
    remaining -= groupSize;
    letterCount++;
    if (letterCount > 6) {
      throw new Error('Exceeded maximum plate length');
    }
    groupSize = 10 ** (6 - letterCount) * 26 ** letterCount;
  }

  const numericCombos = 10 ** (6 - letterCount);
  const letterCombos = 26 ** letterCount;

  const numericPartIndex = Math.floor(remaining / letterCombos);
  const letterPartIndex = remaining % letterCombos;

  const numericPart =
    (6 - letterCount > 0)
      ? toBase(numericPartIndex, DIGITS, 6 - letterCount)
      : '';

  const letterPart = toBase(letterPartIndex, LETTERS, letterCount);

  return numericPart + letterPart;
}

module.exports = getPlateAtIndex;
