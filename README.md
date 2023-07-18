# ExtPlugin
让ext.json支持uniapp的条件编译

## example
```javascript
// webpack.config.js
const ExtPlugin = require('ext-plugin');

module.exports = {
  mode: 'production',

  output: path.resolve(__dirname, '../dist'),
  
  plugins:[
    new ExtPlugin()
    ]
};
```
