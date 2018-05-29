export default [
  {
    "name": "pluginA", // use app.cookie or app.get('cookie') to get the instance of plugin
    "package": "",
    "path": "plugins/pluginA.js",
    "env": ["dev", "prod"], 
    "options": {
      "a": "a",
      "b": "b"
    }
  }
];