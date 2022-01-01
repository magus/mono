import { time } from '../../../src/server/time';
import request from '../../../src/server/request';

export default async function handleGeoIP(req, res) {
  const geo = await time(async () => {
    return request.parse(req);
  });

  return res.status(200).json(JSON.stringify({ error: false, geo }, null, 2));
}
