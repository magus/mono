import boons from './data/boons';
import * as RARITY from './data/rarity';
import * as list from '../../modules/list';

const boon_map = list.to_map((b) => b.key, boons);

// console.debug({ boon_map, RARITY, GODS });

// const current_list = [
//   // { key: 'thunder flourish', level: 1, rarity: RARITY.N.common },
//   // { key: 'lightning strike', level: 3, rarity: RARITY.N.rare },
//   // { key: 'thunder dash', level: 1, rarity: RARITY.N.heroic },
//   // { key: "zeus's aid", level: 6, rarity: RARITY.N.epic },
//   { key: 'tempest flourish', level: 2, rarity: RARITY.N.common },
//   { key: 'trippy shot', level: 1, rarity: RARITY.N.epic },
//   // { key: 'divine dash', level: 1, rarity: RARITY.N.common },
//   // { key: 'hyper sprint', level: 1, rarity: RARITY.N.common },
//   // { key: 'rush delivery', level: 1, rarity: RARITY.N.rare },
// ];

// Ambrosia Delight
// up to 2 random boons are upgraded to the next rarity
export function ambrosia_delight(current_list) {
  const relative_score_list = [];
  const boon_score_list = [];

  for (const current_boon of current_list) {
    // skip boons this ability cannot 'hit'
    // we use this to weight the chance of the random
    // chance of this boon being selected for upgrade
    if (current_boon.rarity === RARITY.N.heroic) {
      continue;
    }

    const boon = boon_map[current_boon.key];
    const pom = boon_pom(boon, current_boon.level);

    const value = boon.rarity[current_boon.rarity] + pom;
    const next_value = boon.rarity[current_boon.rarity + 1] + pom;
    const score = next_value / value - 1;

    relative_score_list.push(score);
    boon_score_list.push({ current_boon, boon, score });

    console.debug({ current_boon, boon, value, next_value });
  }

  const score = chance_score(2, relative_score_list);
  console.debug('ambrosia_delight', { score, boon_score_list });

  return score;
}

// Pom Porridge
// up to 4 random Boons gain +1 Lv.*
export function pom_porridge(current_list) {
  const relative_score_list = [];
  const boon_score_list = [];

  for (const current_boon of current_list) {
    const boon = boon_map[current_boon.key];
    const base_value = boon.rarity[current_boon.rarity];

    const pom = boon_pom(boon, current_boon.level);
    const next_pom = boon_pom(boon, current_boon.level + 1);

    if (next_pom !== 0) {
      const value = base_value + pom;
      const next_value = base_value + next_pom;
      const score = next_value / value - 1;

      relative_score_list.push(score);
      boon_score_list.push({ current_boon, boon, score });

      // console.debug({ current_boon, boon, base_value, value, next_value });
    }
  }

  const score = chance_score(4, relative_score_list);
  // console.debug('pom_porridge', { score, boon_score_list });

  return score;
}

function boon_pom(boon, level) {
  if (!boon.pom.length) {
    return 0.0;
  }

  const trailing_pom = boon.pom[boon.pom.length - 1];

  let pom = 0;

  for (let i = 0; i < level - 1; i++) {
    pom += boon.pom[i] || trailing_pom;
  }

  return pom;
}

function chance_score(max_picks, score_list) {
  let total = 0;

  if (!score_list.length) {
    return total;
  }

  for (const score of score_list) {
    total += score;
  }

  const average = total / score_list.length;
  // use actual number of score but do not exceed max picks
  const picks = Math.min(max_picks, score_list.length);
  const average_pick = picks * average;

  console.debug({ max_picks, score_list, picks, total, average, average_pick });
  return average_pick;
}
