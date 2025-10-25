export function onRequest(context) {
  const url = new URL(context.request.url);
  const link = url.searchParams.get("url");

  return fetch(link, context.request);
}
