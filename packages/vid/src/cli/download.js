import { VidError } from '../common/VidError.js';
import fetch from 'node-fetch';
import util from 'node:util';
import * as ora from 'ora';

import * as chalk from '../common/chalk.js';
import * as CLI from '../common/CLI.js';
import { parse_filename } from '../common/parse_filename.js';
import { download_video_url } from '../common/download_video_url.js';

export async function download(argv) {
  const url = argv.input_video_file.url;

  switch (url.host) {
    case 'twitter.com': {
      switch (true) {
        case await download_tweet(argv):
          return;

        default:
          throw new VidError('Did you pass a tweet url? e.g. https://twitter.com/magusnn/status/1458443583640334337');
      }
    }
  }
}

async function download_tweet(argv) {
  if (!RE.Tweet.test(argv.input_video_file.url)) {
    return false;
  }

  const prefixText = ' 🐦';

  const video_url_list = await ora.oraPromise(fetch_tweet_video_url_list(argv), {
    prefixText,
    text: ' Fetching tweet ... ',
    successText: () => `Successfully fetched tweet ${chalk.bracket(argv.input_video_file.url)}.`,
    failText: () => `Failed to fetch ${chalk.bracket(argv.input_video_file.url)}.`,
  });

  for (const video of video_url_list) {
    const video_url = new URL(video.url);
    // extract just the filename portion of url
    const file = parse_filename(video_url.pathname);
    const output_path = file.full;

    await ora.oraPromise(download_video_url(video.url, output_path), {
      prefixText,
      text: ' Downloading video from tweet ... ',
      successText: () => `Successfully saved video from tweet ${chalk.bracket(output_path)}.`,
      failText: () => `Failed to download video from tweet ${chalk.bracket(video.url)}.`,
    });
  }

  CLI.execSync('open .');

  return true;
}

async function fetch_tweet_video_url_list(argv) {
  const url = argv.input_video_file.url;
  const url_match = url.href.match(RE.Tweet);
  const tweet_id = url_match.groups.tweet_id;

  const timeline_resp = await tweet_timeline(tweet_id);
  const timeline_json = await timeline_resp.json();

  try {
    if (!timeline_resp.ok) {
      throw new VidError('Tweet unavailable');
    }

    const tweet = await tweet_from_timeline(tweet_id, timeline_json);

    if (!tweet) {
      throw new VidError('Tweet unavailable');
    }

    if (argv.verbose) {
      console.debug(pretty({ tweet }));
    }

    const video_list = tweet_video_list(tweet);

    if (argv.verbose) {
      console.debug(pretty({ video_list }));
    }

    return video_list;
  } catch (err) {
    if (argv.verbose) {
      console.debug(pretty({ timeline_json }));
    }

    throw err;
  }
}

function tweet_video_list(tweet) {
  const media_list = tweet?.legacy?.extended_entities?.media;

  if (!Array.isArray(media_list)) {
    throw new VidError('Tweet has no media');
  }

  const video_list = [];

  for (const media of media_list) {
    const variant_list = media?.video_info?.variants;

    if (!Array.isArray(variant_list) || !variant_list.length) {
      continue;
    }

    let max_variant = null;
    let max_bitrate = 0;

    for (const variant of variant_list) {
      if (variant.bitrate > max_bitrate) {
        max_bitrate = variant.bitrate;
        max_variant = variant;
      }
    }

    if (max_variant) {
      video_list.push(max_variant);
    }
  }

  if (!video_list.length) {
    throw new VidError('Tweet has no video');
  }

  return video_list;
}
/**
# get guest token
curl 'https://api.twitter.com/1.1/guest/activate.json' \
  -X POST \
  -H 'authorization: Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA' \
  --compressed

# use guest token to fetch tweet detail
curl 'https://api.twitter.com/graphql/HQ_gjq7zDNvSiJOCSkwUEw/TweetDetail?variables=%7B%22focalTweetId%22%3A%221613443116228546561%22%2C%22with_rux_injections%22%3Afalse%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withBirdwatchNotes%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22view_counts_public_visibility_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_uc_gql_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D' \
  -H 'authorization: Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA' \
  -H 'x-guest-token: 1615126322636021760' \
  --compressed
 */
async function tweet_timeline(tweet_id) {
  const guest_token_resp = await fetch('https://api.twitter.com/1.1/guest/activate.json', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${LOGGED_OUT_BEARER}`,
    },
  });

  if (!guest_token_resp.ok) {
    throw new VidError('Tweet unavailable');
  }

  const { guest_token } = await guest_token_resp.json();

  const graphql_url = new URL('https://api.twitter.com/graphql/HQ_gjq7zDNvSiJOCSkwUEw/TweetDetail');

  const variables = JSON.stringify({
    focalTweetId: tweet_id,
    with_rux_injections: false,
    includePromotedContent: true,
    withCommunity: false,
    withQuickPromoteEligibilityTweetFields: false,
    withBirdwatchNotes: false,
    withSuperFollowsUserFields: false,
    withDownvotePerspective: false,
    withReactionsMetadata: false,
    withReactionsPerspective: false,
    withSuperFollowsTweetFields: false,
    withVoice: true,
    withV2Timeline: true,
  });

  const features = JSON.stringify({
    responsive_web_twitter_blue_verified_badge_is_enabled: true,
    verified_phone_label_enabled: false,
    responsive_web_graphql_timeline_navigation_enabled: true,
    view_counts_public_visibility_enabled: true,
    view_counts_everywhere_api_enabled: true,
    longform_notetweets_consumption_enabled: false,
    tweetypie_unmention_optimization_enabled: true,
    responsive_web_uc_gql_enabled: true,
    vibe_api_enabled: true,
    responsive_web_edit_tweet_api_enabled: true,
    graphql_is_translatable_rweb_tweet_is_translatable_enabled: false,
    standardized_nudges_misinfo: true,
    tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: false,
    interactive_text_enabled: true,
    responsive_web_text_conversations_enabled: false,
    responsive_web_enhance_cards_enabled: false,
  });

  graphql_url.search = String(new URLSearchParams({ variables, features }));

  const tweet_detail_resp = await fetch(String(graphql_url), {
    method: 'GET',
    headers: {
      authorization: `Bearer ${LOGGED_OUT_BEARER}`,
      'x-guest-token': guest_token,
    },
  });

  return tweet_detail_resp;
}

async function tweet_from_timeline(tweet_id, timeline_json) {
  for (const instruction of timeline_json.data.threaded_conversation_with_injections_v2.instructions) {
    switch (instruction.type) {
      case 'TimelineAddEntries': {
        for (const entry of instruction.entries) {
          const itemContent = entry.content.itemContent;
          switch (itemContent.itemType) {
            case 'TimelineTweet': {
              const tweet = itemContent.tweet_results.result;

              if (tweet.rest_id === tweet_id) {
                return tweet;
              }
            }
          }
        }
        break;
      }

      default:
      // skip
    }
  }

  return null;
}

const RE = {
  Tweet: new RegExp('https://twitter.com/[^/]+/status/(?<tweet_id>\\d+)'),
};

const LOGGED_OUT_BEARER =
  'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';

function pretty(object) {
  return util.inspect(object, { showHidden: false, depth: null, colors: true });
}
