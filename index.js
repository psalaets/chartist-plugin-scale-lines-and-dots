module.exports = makePluginInstance;

makePluginInstance.calculateScaleFactor = calculateScaleFactor;
makePluginInstance.scaleValue = scaleValue;

function makePluginInstance() {
  return function scaleLinesAndDotsInstance(chart) {
    chart.on('draw', function(data) {
      if (data.type === 'point') {
        scaleDot(data);
      } else if (data.type === 'line') {
        scaleLine(data);
      }
    });
  };
}

function scaleLine(data) {
  scaleElementStrokeWidth(data, scaleValue.bind(null, 2, 6));
}

function scaleDot(data) {
  scaleElementStrokeWidth(data, scaleValue.bind(null, 8, 16));
}

function scaleElementStrokeWidth(data, scaleFn) {
  var element = data.element;
  var svgWidth = element.root().width();

  var scaleFactor = calculateScaleFactor(360, 1000, svgWidth);
  var scaledStrokeWidth = scaleFn(scaleFactor);

  element.attr({
    style: 'stroke-width: ' + scaledStrokeWidth
  });
}

function calculateScaleFactor(min, max, value) {
  if (max <= min) {
    throw new Error('max must be > min');
  }

  var delta = max - min;
  var scaleFactor = (value - min) / delta;

  scaleFactor = Math.min(scaleFactor, 1);
  scaleFactor = Math.max(scaleFactor, 0);

  return scaleFactor;
}

function scaleValue(min, max, scaleFactor) {
  if (scaleFactor > 1) throw new Error('scaleFactor cannot be > 1');
  if (scaleFactor < 0) throw new Error('scaleFactor cannot be < 0');
  if (max < min) throw new Error('max cannot be < min');

  var delta = max - min;
  return (delta * scaleFactor) + min;
}
