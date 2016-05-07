var test = require('tape');

var scaleLinesAndDots = require('../../');
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

  var chart = setUpChart(520); // 25% from lower

  chart.on('created', function() {
    t.equals(getLineStrokeWidth(), '3px');
    t.equals(getDotStrokeWidth(), '10px');

    tearDown();
  });
});

test('chart width equal to upper threshold', function(t) {
  t.plan(2);

  var chart = setUpChart(1000);

  chart.on('created', function() {
    t.equals(getLineStrokeWidth(), '6px');
    t.equals(getDotStrokeWidth(), '16px');

    tearDown();
  });
});

test('chart width greater than upper threshold', function(t) {
  t.plan(2);

  var chart = setUpChart(1200);

  chart.on('created', function() {
    t.equals(getLineStrokeWidth(), '6px');
    t.equals(getDotStrokeWidth(), '16px');

    tearDown();
  });
});

function setUpChart(width) {
  addChartContainer(width);

  return new Chartist.Line(getChartContainer(), {
    labels: ['a', 'b', 'c'],
    series: [
      [1, 2, 3],
      [4, 5, 6]
    ]
  }, {
    plugins: [
      scaleLinesAndDots()
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