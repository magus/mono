import { VidError } from '../VidError.js';
import { handle_tweet } from './handle_tweet.js';

export async function fetch_video_list(options) {
  const result = {
    video_url_list: [],
  };

  switch (options.url.host) {
    case 'twitter.com': {
      switch (true) {
        case await handle_tweet(options, result):
          return result.video_url_list;

        default:
          throw new VidError('Did you pass a tweet url? e.g. https://twitter.com/magusnn/status/1458443583640334337');
      }
    }

    default:
      throw new VidError(`Sorry, [${options.url.host}] is current unsupported`);
  }
}
