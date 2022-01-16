// apply babel plugins to json
exports.babelrc = function babelrc(json) {
  json.plugins.push(['styled-components', { ssr: true, displayName: true }]);
  return json;
};
