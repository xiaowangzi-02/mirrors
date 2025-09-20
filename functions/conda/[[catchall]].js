export function onRequest(context) {
  const domain = "conda.anaconda.org";
  const url = new URL(context.request.url);
  url.hostname = domain;
  // url.protocol = "https:";
  // url.port = "";
  url.pathname = context.functionPath.split("/").slice(2).join("/");

  // console.log(`${context.functionPath} -> ${url.pathname}`);
  // console.log("Proxying request to", url.toString());

  // console.log("Request headers:", [...context.request.headers]);

  return fetch(url, context.request);
}
