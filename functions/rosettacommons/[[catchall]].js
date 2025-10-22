export function onRequest(context) {
  const domain = "conda.rosettacommons.org";
  const url = new URL(context.request.url);
  url.hostname = domain;
  url.pathname = context.functionPath.split("/").slice(2).join("/");

  return fetch(url, context.request);
}
