// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const ua = req.headers['user-agent'];
  res.status(200).json({ ua });
}
