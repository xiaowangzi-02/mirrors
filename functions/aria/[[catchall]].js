export function onRequest(context) {
  const ip = "129.150.56.161";
  const url = new URL(context.request.url);
  url.hostname = ip;
  url.pathname = context.functionPath.split("/").slice(2).join("/");
  url.protocol = "http:";
  url.port = "6800";

  return fetch(url, context.request);
}
