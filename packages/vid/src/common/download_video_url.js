import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import util from 'node:util';
import fetch from 'node-fetch';

import { VidError } from '../common/VidError.js';

export async function download_video_url(video_url, output_path) {
  const streamPipeline = util.promisify(pipeline);

  const response = await fetch(video_url);

  if (!response.ok) {
    throw new VidError('Video unavailable');
  }

  await streamPipeline(response.body, createWriteStream(output_path));
}
