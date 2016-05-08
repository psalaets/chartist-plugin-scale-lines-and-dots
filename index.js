module.exports = makePluginInstance;

makePluginInstance.calculateScaleFactor = calculateScaleFactor;
makePluginInstance.scaleValue = scaleValue;

function makePluginInstance() {
  return function scaleLinesAndDotsInstance(chart) {
    var svgWidth;

    chart.on('draw', function(data) {
      if (data.type === 'point') {
        scaleDot(data);
      } else if (data.type === 'line') {
        scaleLine(data);
      }
    });

    /**
    * @param {Object} data - Object passed to 'draw' event listener
    */
    function scaleLine(data) {
      scaleElementStrokeWidth(data, scaleValue.bind(null, 2, 6));
    }

    /**
    * @param {Object} data - Object passed to 'draw' event listener
    */
    function scaleDot(data) {
      scaleElementStrokeWidth(data, scaleValue.bind(null, 8, 16));
    }

    /**
    * @param {Object} data - Object passed to 'draw' event listener
    * @param {Function} scaleFn - Takes scale factor and returns scaled value
    */
    function scaleElementStrokeWidth(data, scaleFn) {
      var scaleFactor = calculateScaleFactor(360, 1000, getSvgWidth(data));
      var scaledStrokeWidth = scaleFn(scaleFactor);
      var element = data.element;

      element.attr({
        style: 'stroke-width: ' + scaledStrokeWidth
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
