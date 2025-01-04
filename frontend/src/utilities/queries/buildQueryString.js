/**
 * Build a query string from an object of parameters.
 * @param {Object} params - An object where keys are parameter names and values are parameter values.
 * @returns {String} - The query string.
 */
export const buildQueryString = (params) => {
  const query = Object.keys(params)
    .filter(
      (key) =>
        params[key] !== undefined && params[key] !== null && params[key] !== ""
    )
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
    )
    .join("&");

  return query ? `?${query}` : "";
};
