export default async function Handler(req, res) {
  try {
    if (!req.query.url) {
      throw new Error('Required [url] is missing');
    }

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=359');
    res.redirect(304, req.query.url);
  } catch (err) {
    res.status(500);
  }
}
