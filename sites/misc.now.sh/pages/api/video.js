import * as vid from '@magusn/vid';

export default async function Handler(req, res) {
  try {
    if (!req.query.url) {
      throw new Error('Required [url] is missing');
    }

    const url = new URL(req.query.url);
    const video_list = await vid.fetch_video_list({ url });
    const data = video_list.map((href) => {
      const video_url = new URL(href);
      const { extension, name, full } = vid.parse_filename(video_url.pathname);
      return { extension, name, full, href };
    });

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=359');
    res.status(200).json({ error: false, data });
  } catch (err) {
    const error = err.message;
    res.status(500).json({ error, data: null });
  }
}
