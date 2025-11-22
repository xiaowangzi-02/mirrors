export async function onRequestGet(context) {
  const path = new URL(context.request.url).pathname.replace("/r2/", "");
  const file = await context.env.BUCKET.get(path);
  if (!file) return new Response(null, { status: 404 });
  return new Response(file.body, {
    headers: { "Content-Type": file.httpMetadata.contentType },
  });
}
