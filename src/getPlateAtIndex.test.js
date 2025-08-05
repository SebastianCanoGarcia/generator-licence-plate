const getPlateAtIndex = require('./getPlateAtIndex');

/**
 * This script tests the getPlateAtIndex function for a set of representative indices.
 * It prints the index and the corresponding license plate string.
 *
 * The tested indices cover:
 * - The beginning of the sequence (only digits),
 * - Transition from digits to letters,
 * - Plates with increasing numbers of letters,
 * - Large index values near the maximum plate.
 */

const indices = [
  0,
  1,
  999999,
  1000000,
  1000001,
  1000025,
  1000026,
  1000052,
  1000053,
  3599999,
  3600000,
  3600001,
  3900000,
  4400000,
  4400001,
  10000000,
  15000000,
  99999999,
  501363135
];

indices.forEach(n => {
  console.log(`${n}: ${getPlateAtIndex(n)}`);
});
