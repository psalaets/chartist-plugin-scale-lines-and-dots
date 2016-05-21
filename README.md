# chartist-plugin-scale-lines-and-dots

Chartist plugin to scale lines and dots based on chart width.

## Install

`npm install chartist-plugin-scale-lines-and-dots --save`

## Usage

```js
var Chartist = require('chartist');
var scaleLinesAndDots = require('chartist-plugin-scale-lines-and-dots');

var chart = new Chartist.Line(element, data, {
  plugins: [
    scaleLinesAndDots(options)
  ]
});
```

### options

Everything is optional including the options object itself.

```js
{
  dot: {
    // Minimum stroke-width a dot can have, default: 8
    min: Number,
    // Maximum stroke-width a dot can have, default: 10
    max: Number,
    // Unit used for dot's stroke-width, default: 'px'
    unit: String
  },
  line: {
    // Minimum stroke-width a line can have, default: 2
    min: Number,
    // Maximum stroke-width a line can have, default: 4
    max: Number,
    // Unit used for line's stroke-width, default: 'px'
    unit: String
  },
  svgWidth: {
    // Lower threshold for chart width. When chart width is <= this
    // value, the chart's lines and dots will be at their min size.
    min: Number,
    // Upper threshold for chart width. When chart width is >= this
    // value, the chart's lines and dots will be at their max size.
    max: Number
  }
}
```

## License

MIT
