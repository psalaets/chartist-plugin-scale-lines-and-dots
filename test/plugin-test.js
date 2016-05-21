var test = require('tape');

var scaleLinesAndDots = require('../');
var Chartist = require('chartist');
var chartContainerId = 'chart-container';

test('chart width less than lower threshold', function(t) {
  t.plan(2);

  var chart = setUpChart(320);

  chart.on('created', function() {
    t.equals(getLineStrokeWidth(), '2px');
    t.equals(getDotStrokeWidth(), '8px');

    tearDown();
  });
});

test('chart width equal to lower threshold', function(t) {
  t.plan(2);

  var chart = setUpChart(360);

  chart.on('created', function() {
    t.equals(getLineStrokeWidth(), '2px');
    t.equals(getDotStrokeWidth(), '8px');

    tearDown();
  });
});

test('chart width between thresholds', function(t) {
  t.plan(2);

  // 520 is 25% of the way from lower threshold to upper threshold
  var chart = setUpChart(520);

  chart.on('created', function() {
    t.equals(getLineStrokeWidth(), '2.5px');
    t.equals(getDotStrokeWidth(), '8.5px');

    tearDown();
  });
});

test('chart width equal to upper threshold', function(t) {
  t.plan(2);

  var chart = setUpChart(1000);

  chart.on('created', function() {
    t.equals(getLineStrokeWidth(), '4px');
    t.equals(getDotStrokeWidth(), '10px');

    tearDown();
  });
});

test('chart width greater than upper threshold', function(t) {
  t.plan(2);

  var chart = setUpChart(1200);

  chart.on('created', function() {
    t.equals(getLineStrokeWidth(), '4px');
    t.equals(getDotStrokeWidth(), '10px');

    tearDown();
  });
});

test('with all sizing options specified', function(t) {
  t.plan(2);

  var chart = setUpChart(750, {
    dot: {
      min: 10,
      max: 15,
      unit: 'em'
    },
    line: {
      min: 20,
      max: 25,
      unit: 'em'
    },
    svgWidth: {
      min: 500,
      max: 1000
    }
  });

  chart.on('created', function() {
    t.equals(getLineStrokeWidth(), '22.5em');
    t.equals(getDotStrokeWidth(), '12.5em');

    tearDown();
  });
});

test('with some sizing options omitted', function(t) {
  t.plan(2);

  var chart = setUpChart(750, {
    dot: {
      min: 10,
      max: 15,
      unit: 'em'
    },
    svgWidth: {
      min: 500,
      max: 1000
    }
  });

  chart.on('created', function() {
    t.equals(getLineStrokeWidth(), '3px');
    t.equals(getDotStrokeWidth(), '12.5em');

    tearDown();
  });
});

function setUpChart(width, options) {
  addChartContainer(width);

  return new Chartist.Line(getChartContainer(), {
    labels: ['a', 'b', 'c'],
    series: [
      [1, 2, 3],
      [4, 5, 6]
    ]
  }, {
    plugins: [
      scaleLinesAndDots(options)
    ]
  });
}

function tearDown() {
  removeChartContainer();
}

function addChartContainer(width) {
  var chartContainer = document.createElement('div');
  chartContainer.id = chartContainerId;
  chartContainer.style.position = 'fixed';
  chartContainer.style.width = width + 'px';

  document.body.appendChild(chartContainer);
}

function getChartContainer() {
  return document.getElementById(chartContainerId);
}

function removeChartContainer() {
  var chartContainer = getChartContainer();
  chartContainer.remove();
}

function getLineStrokeWidth() {
  var chartContainer = getChartContainer();
  var line = chartContainer.querySelector('svg .ct-series .ct-line');
  return getComputedStyle(line).strokeWidth;
}

function getDotStrokeWidth() {
  var chartContainer = getChartContainer();
  var dot = chartContainer.querySelector('svg .ct-series .ct-point');
  return getComputedStyle(dot).strokeWidth;
}
