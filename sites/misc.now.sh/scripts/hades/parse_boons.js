import fs from 'fs';
import path from 'path';
import url from 'url';
// Purposefully not importing at top-level to prevent huge eslint slowdown
// Large import causes eslint / saving to be extremely slow, so instead
// we dynamically import `prettier` below inside `write_json`
// import prettier from 'prettier';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const input_dir = path.resolve(__dirname, 'input');
const all_boons_path = path.resolve(__dirname, '../../src/screens/Hades/data/boons.json');

// hardcode god list when reading from `data/[god].txt`
const GOD_LIST = ['zeus', 'poseidon', 'athena', 'ares', 'artemis', 'aphrodite', 'dionysus', 'demeter', 'hermes'];

async function main() {
  const all_boon_list = [];

  for (const god of GOD_LIST) {
    const god_boon_list = await parse_god(god);
    all_boon_list.push(...god_boon_list);
  }

  // join all gods into single `boons.json`
  await write_json(all_boons_path, all_boon_list);
}

async function parse_god(god) {
  console.debug(`parse_god('${god}')`);

  const god_input_path = path.resolve(input_dir, `${god}.txt`);
  const content = fs.readFileSync(god_input_path).toString();
  const content_line_list = content.split('\n');

  const line_type_order = ['name', 'description', 'common', 'rare', 'epic', 'heroic', 'pom'];
  const boon_list = [];

  let boon = {};

  for (let i = 0; i < content_line_list.length; i++) {
    let line = content_line_list[i];

    // cleanup line
    line = line.replace(RE.start_quote, '');
    line = line.replace(RE.end_quote, '');

    const type_index = i % line_type_order.length;
    const type = line_type_order[type_index];

    if (type_index === 0) {
      if (boon.name) {
        boon_list.push(boon);
      }

      boon = {
        god,
        rarity: [],
      };
    }

    switch (type) {
      case 'common':
      case 'rare':
      case 'epic':
      case 'heroic': {
        try {
          const range_match = line.split(RE.numeric_range_split);

          if (range_match.length > 1) {
            const [min, max] = range_match;
            const avg = (parse_numeric(min) + parse_numeric(max)) / 2;
            boon.rarity.push(avg);
          } else {
            boon.rarity.push(parse_numeric(line));
          }
        } catch (err) {
          throw new Error(`unable to parse\n\n\t>\t${line}\n`);
        }

        break;
      }

      case 'pom': {
        if (line.indexOf('/') === -1) {
          boon[type] = [];
        } else {
          boon[type] = line.replace('/...', '').split('/').map(decimal);
        }
        break;
      }

      case 'name': {
        boon[type] = line;
        boon.key = line.toLowerCase();
        break;
      }

      default:
        boon[type] = line;
    }
  }

  // const output_path = path.resolve(input_dir, `${god}.json`);
  // await write_json(output_path, boon_list);
  return boon_list;
}

const RE = {
  numeric: /(?<numeric>\d+(?:\.\d+)?)/,
  numeric_range_split: / to /,
  start_quote: /^"/,
  end_quote: /"$/,
};

const decimal = (value) => parseFloat(value);

function parse_numeric(value) {
  const match = value.match(RE.numeric);
  return decimal(match.groups.numeric);
}

async function write_json(output_path, json) {
  const prettier = (await import('prettier')).default;
  const formatted_output = prettier.format(JSON.stringify(json), { semi: false, parser: 'json' });
  fs.writeFileSync(output_path, formatted_output);
}

main();
