# loopback-row-count-mixin
A mixin to get total count of a model for pagination in a loopback Model.

## INSTALL

```
npm install --save loopback-row-count-mixin
```

###### you can enable mixin by editing `server.js`:

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

##### Default

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

```
http://0.0.0.0:3000/api/players
```

will return list of players with field to help for you pagination

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

##### Customize

```json
{
  "name": "player",
  "properties": {
    "name": "string",
    "type": "string",
  },
  "mixins": {
    "RowCount": {
      "count": "total",
      "rows" : "results"
    }
  }
}
```

```
http://0.0.0.0:3000/api/players
```

will return list of players with field

```json
{
    "total": 2,
    "results": [
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
