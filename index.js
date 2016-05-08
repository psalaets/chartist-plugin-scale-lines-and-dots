module.exports = makePluginInstance;

makePluginInstance.calculateScaleFactor = calculateScaleFactor;
makePluginInstance.scaleValue = scaleValue;

function makePluginInstance() {
  var options = {
    dot: {
      min: 8,
      max: 16,
      unit: 'px'
    },
    line: {
      min: 2,
      max: 6,
      unit: 'px'
    },
    svg: {
      min: 360,
      max: 1000
    }
  };

  return function scaleLinesAndDotsInstance(chart) {
    var svgWidth;

    chart.on('draw', function(data) {
      if (data.type === 'point') {
        setStrokeWidth(data, options.dot, options.svg);
      } else if (data.type === 'line') {
        setStrokeWidth(data, options.line, options.svg);
      }
    });

    /**
    * @param {Object} data - Object passed to 'draw' event listener
    */
    function setStrokeWidth(data, widthRange, thresholds) {
      var scaleFactor = calculateScaleFactor(thresholds.min, thresholds.max, getSvgWidth(data));
      var strokeWidth = scaleValue(widthRange.min, widthRange.max, scaleFactor);

      data.element.attr({
        style: 'stroke-width: ' + strokeWidth + widthRange.unit
      });
    }

    /**
    * @param {Object} data - Object passed to 'draw' event listener
    */
    function getSvgWidth(data) {
      return svgWidth = svgWidth || data.element.root().width();
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
