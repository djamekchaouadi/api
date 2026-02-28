export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing url" });
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).send("Failed to fetch");
    }

    const contentType = response.headers.get("content-type") || "text/plain";
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", contentType);

    const buffer = Buffer.from(await response.arrayBuffer());
    return res.status(200).send(buffer);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
