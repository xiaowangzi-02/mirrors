export function onRequest(context) {
  const domain = "graylab.jhu.edu";
  const url = new URL(context.request.url);
  url.hostname = domain;
  url.pathname = context.functionPath.split("/").slice(2).join("/");

  return fetch(url, context.request);
}
