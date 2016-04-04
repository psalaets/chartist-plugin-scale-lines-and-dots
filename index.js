module.exports.calculateScaleFactor = calculateScaleFactor;

function calculateScaleFactor(min, max, value) {
  var delta = max - min;
  return (value - min) / delta;
}
