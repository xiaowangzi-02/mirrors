export async function onRequestPut(context) {
  // 1. Get the path from the URL (after /r2/)
  const path = context.functionPath.split("/").slice(2).join("/");

  if (!path) return new Response("Missing filename", { status: 400 });

  try {
    // 2. Upload the request body (stream) to R2
    await context.env.BUCKET.put(path, context.request.body, {
      onlyIf: context.request.headers,
      httpMetadata: context.request.headers,
    });

    return new Response(`Successfully uploaded ${path}`, { status: 201 });
  } catch (err) {
    return new Response(`Upload failed: ${err.message}`, { status: 500 });
  }
}

export async function onRequestGet(context) {
  const path = context.functionPath.split("/").slice(2).join("/");

  const object = await context.env.BUCKET.get(path, {
    onlyIf: context.request.headers,
    range: context.request.headers,
  });

  if (object === null) {
    return new Response("Object Not Found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);

  if (object.body === undefined) {
    return new Response(null, {
      status: 304,
      headers,
    });
  }

  return new Response(object.body, {
    status: 200,
    headers,
  });
}
