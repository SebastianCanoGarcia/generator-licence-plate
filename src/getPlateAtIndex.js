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

  // Convert a number to a string in a custom base, padded to length
  function toBase(value, charset, length) {
    const base = charset.length;
    let result = '';
    do {
      result = charset[value % base] + result;
      value = Math.floor(value / base);
    } while (value > 0);
    return charset[0].repeat(length - result.length) + result;
  }

  // 1. Validate input type
  if (!Number.isInteger(n)) {
    throw new Error('Index must be an integer');
  }

  // 2. Validate negative
  if (n < 0) {
    throw new Error('Index must be a non-negative integer');
  }

  // 3. Calculate max index (last valid plate = ZZZZZZ)
  const TOTAL_DIGIT_ONLY = 10 ** 6;
  let maxIndex = TOTAL_DIGIT_ONLY;
  for (let letterCount = 1; letterCount <= 6; letterCount++) {
    maxIndex += 10 ** (6 - letterCount) * 26 ** letterCount;
  }

  if (n >= maxIndex) {
    throw new Error(`Index exceeds the maximum allowed value: ${maxIndex - 1}`);
  }

  // Return digit-only plates
  if (n < TOTAL_DIGIT_ONLY) {
    return toBase(n, DIGITS, 6);
  }

  // Calculate hybrid plate
  let remaining = n - TOTAL_DIGIT_ONLY;
  let letterCount = 1;
  let groupSize = 10 ** (6 - letterCount) * 26 ** letterCount;

  while (remaining >= groupSize) {
    remaining -= groupSize;
    letterCount++;
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
