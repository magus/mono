// apply babel plugins to json
exports.babelrc = function babelrc(json) {
  if (!json.plugins) json.plugins = [];
  json.plugins.push(['styled-components', { ssr: true, displayName: true }]);
  return json;
};
