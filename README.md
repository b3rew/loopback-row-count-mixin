# loopback-row-count-mixin
A mixin to get total count of a model for a loopback Model.

## INSTALL

```
npm install --save loopback-row-count-mixin
```

There are 2 ways to enable mixin:

### 1) server.js

In your server/server.js file add the following line before the boot(app, __dirname); line.

```js
...
var app = module.exports = loopback();
...
// Add Counts Mixin to loopback
require('loopback-row-count-mixin')(app);

boot(app, __dirname, function(err) {
  'use strict';
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
```

### 2) mixin sources

Add the mixins property to your server/model-config.json like the following:

```json
{
  "_meta": {
    "sources": [
      "loopback/common/models",
      "loopback/server/models",
      "../common/models",
      "./models"
    ],
    "mixins": [
      "loopback/common/mixins",
      "loopback/server/mixins",
      "../node_modules/loopback-row-count-mixin",
      "../common/mixins",
      "./mixins"
    ]
  }
}
```

## CONFIG

To use with your Models add the `mixins` attribute to the definition object of your model config.

```json
{
  "name": "player",
  "properties": {
    "name": "string",
    "type": "string",
  },
  "mixins": {
    "RowCount": true
  }
}
```

## USAGE

### EXAMPLE

```
http://0.0.0.0:3000/api/players
```

will return list of players with field

```json
{
    "count": 2,
    "rows": [
      {
        "id": 1,
        "title": "First player",
        "type": ""
      },
      {
        "id": 2,
        "title": "Second player",
        "type": ""
      }
    ]
}

```

## LICENSE

MIT

