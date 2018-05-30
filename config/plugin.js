export default [
  {
    "name": "pluginA", // use get('pluginA') to get the instance of plugin => new PluginA(options)
    "package": "",
    "path": "plugins/pluginA.js",
    "env": ["dev", "prod"], 
    "options": {
      "a": "a",
      "b": "b"
    }
  },
  {
    "name": "cookie", // use .get('cookie', ctx, key) to get the instance of plugin => new Cookie(ctx, key)
    "package": "",
    "path": "src/lib/cookie/Cookies.js",
    "env": ["dev", "prod"]
  }
];