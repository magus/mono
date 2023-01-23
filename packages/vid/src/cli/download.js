import path from 'path';
import * as ora from 'ora';

import * as chalk from '../common/chalk.js';
import * as CLI from '../common/CLI.js';
import { parse_filename } from '../common/parse_filename.js';
import { download_video_url } from '../common/download_video_url.js';
import { fetch_video_list } from '../common/fetch_video_list/index.js';

export async function download(argv) {
  const url = argv.input_video_file.url;
  const verbose = argv.verbose;

  const target = chalk.bracket(url);
  const fetch_promise = fetch_video_list({ url, verbose });
  const video_url_list = await ora.oraPromise(fetch_promise, {
    text: ` Fetching ${target} ... `,
    successText: () => `Successfully fetched ${target}.`,
    failText: () => `Failed to fetch ${target}.`,
  });

  for (const url of video_url_list) {
    await ora_download(url);
  }

  CLI.execSync('open .');
}

async function ora_download(url_str) {
  const video_url = new URL(url_str);

  // parse just the filename portion of url
  const file = parse_filename(path.basename(video_url.pathname));
  const output_path = file.full;
  const target = chalk.bracket(file.name);

  await ora.oraPromise(download_video_url(url_str, output_path), {
    text: ` Downloading ${target} ... `,
    successText: () => `Saved video ${target}.`,
    failText: () => `Failed to download video ${chalk.bracket(url_str)}.`,
  });
}
