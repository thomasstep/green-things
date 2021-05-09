// Generates random 6 digit int by default
function getRandomInt(max = 999999) {
  return Math.floor(Math.random() * max);
}

export default getRandomInt;
