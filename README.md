##### shush
Hush up those JSON comments.

`shush` is a simple node module that allows JSON files (which may contain comments) to read into
a module using a `require`-like syntax.

```json
{
    // a property
    "myProp": "isCool"
}
```
```javascript
var shush = require('shush'),
    config = shush('./jsonWithComments');

console.log(config); // {"myProp": "isCool"}
```

Forthcoming feature: streaming.