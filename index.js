var Chartist = require('chartist');

module.exports = makePluginInstance;

makePluginInstance.calculateScaleFactor = calculateScaleFactor;
makePluginInstance.scaleValue = scaleValue;

function makePluginInstance(userOptions) {
  var defaultOptions = {
    dot: {
      min: 8,
      max: 10,
      unit: 'px'
    },
    line: {
      min: 2,
      max: 4,
      unit: 'px'
    },
    svgWidth: {
      min: 360,
      max: 1000
    }
  };

  var options = Chartist.extend({}, defaultOptions, userOptions);

  return function scaleLinesAndDotsInstance(chart) {
    var actualSvgWidth;

    chart.on('draw', function(data) {
      if (data.type === 'point') {
        setStrokeWidth(data, options.dot, options.svgWidth);
      } else if (data.type === 'line') {
        setStrokeWidth(data, options.line, options.svgWidth);
      }
    });

    /**
    * Set stroke-width of the element of a 'data' object, based on chart width.
    *
    * @param {Object} data - Object passed to 'draw' event listener
    * @param {Object} widthRange - Specifies min/max stroke-width and unit.
    * @param {Object} thresholds - Specifies chart width to base scaling on.
    */
    function setStrokeWidth(data, widthRange, thresholds) {
      var scaleFactor = calculateScaleFactor(thresholds.min, thresholds.max, getActualSvgWidth(data));
      var strokeWidth = scaleValue(widthRange.min, widthRange.max, scaleFactor);

      data.element.attr({
        style: 'stroke-width: ' + strokeWidth + widthRange.unit
      });
    }

    /**
    * @param {Object} data - Object passed to 'draw' event listener
    */
    function getActualSvgWidth(data) {
      return data.element.root().width();
    }
  };
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
