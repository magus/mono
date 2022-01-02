export function method(allowedMethodsList) {
  const allowedMethods = allowedMethodsList.reduce((dict, method) => {
    dict[method] = true;
    return dict;
  }, {});

  return function requestMethods(req) {
    // console.debug(req.method, { allowedMethods });

    if (!allowedMethods[req.method]) {
      throw new Error(`[${req.method}] is not allowed.`);
    }
  };
}
