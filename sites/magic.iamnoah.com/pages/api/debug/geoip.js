import geoip from 'geo-from-ip';

import { time } from '../../../src/server/time';
import request from '../../../src/server/request';

export default async function handleGeoIP(req, res) {
  const geoFromIP = await time(async () => {
    const ip = req.query.ip || request.getRealIP(req);
    const geo = await geoip.allData(ip);
    return geo;
  });

  const geoVercel = await time(async () => {
    const country = req.headers['x-vercel-ip-country'];
    const region = req.headers['x-vercel-ip-country-region'];
    const city = req.headers['x-vercel-ip-city'];
    return { country, region, city };
  });

  return res.status(200).json(JSON.stringify({ error: false, geoFromIP, geoVercel }, null, 2));
}
