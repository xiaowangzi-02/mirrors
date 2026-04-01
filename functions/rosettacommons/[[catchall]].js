export function onRequest(context) {
  const url = new URL(context.request.url);
  const pathnames = url.pathname.split("/");

  switch (pathnames[2]) {
    case "conda":
      url.hostname = "conda.rosettacommons.org";
      break;
    case "west":
      url.hostname = "west.rosettacommons.org";
      break;
    default:
      url.hostname = "rosettacommons.org";
      break;
  }

  url.pathname = pathnames.slice(3).join("/");

  return fetch(url, context.request);
}
