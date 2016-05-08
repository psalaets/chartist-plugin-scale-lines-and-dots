# chartist-plugin-scale-lines-and-dots

Chartist plugin to size lines and dots based on chart width.

## Install

`npm install chartist-plugin-scale-lines-and-dots --save`

## Usage

```js
var Chartist = require('chartist');
var scaleLinesAndDots = require('chartist-plugin-scale-lines-and-dots');

var chart = new Chartist.Line(element, data, {
  plugins: [
    scaleLinesAndDots()
  ]
});
```

## License

MIT