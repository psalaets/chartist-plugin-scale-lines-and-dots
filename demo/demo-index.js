var Chartist = require('chartist');
var scaleLinesAndDots = require('..');

// with plugin

;[1, 2, 3].forEach(function (i) {
  renderChart('#s' + i, scaleLinesAndDots());
});

renderChart('#b1', scaleLinesAndDots());

// without plugin

;[4, 5, 6].forEach(function (i) {
  renderChart('#s' + i);
});

renderChart('#b2');

// helpers

function renderChart(elementId, plugin) {
  var data = {
    labels: ['A', 'B', 'C', 'D', 'E'],
    series: [
      [5, 2, 4, 2, 0]
    ]
  };

  var plugins = [];
  if (plugin) {
    plugins.push(plugin);
  }

  new Chartist.Line(elementId, data, {
    fullWidth: true,
    plugins: plugins
  });
}
