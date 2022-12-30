import boons from './data/boons';
import rarity from './data/rarity';
import * as GODS from './data/gods';
import * as list from '../../modules/list';

const boon_map = list.to_map((b) => b.key, boons);
const rarity_enum = list.to_numeric_enum(rarity);

console.debug({ boon_map, rarity_enum, GODS });

const current_list = [
  // { name: 'thunder flourish', level: 1, rarity: 0 },
  // { name: 'lightning strike', level: 3, rarity: 1 },
  // { name: 'thunder dash', level: 1, rarity: 3 },
  // { name: "zeus's aid", level: 6, rarity: 2 },
  { name: 'tempest flourish', level: 2, rarity: 0 },
  { name: 'trippy shot', level: 1, rarity: 2 },
  // { name: 'divine dash', level: 1, rarity: 0 },
  // { name: 'hyper sprint', level: 1, rarity: 0 },
  // { name: 'rush delivery', level: 1, rarity: 1 },
];

// Ambrosia Delight
// up to 2 random boons are upgraded to the next rarity
function ambrosia_delight() {
  const relative_score_list = [];
  const boon_score_list = [];

  for (const current_boon of current_list) {
    // skip boons this ability cannot 'hit'
    // we use this to weight the chance of the random
    // chance of this boon being selected for upgrade
    if (current_boon.rarity === rarity_enum.heroic) {
      continue;
    }

    const boon = boon_map[current_boon.name];
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
function pom_porridge() {
  const relative_score_list = [];
  const boon_score_list = [];

  for (const current_boon of current_list) {
    const boon = boon_map[current_boon.name];
    const base_value = boon.rarity[current_boon.rarity];

    const pom = boon_pom(boon, current_boon.level);
    const next_pom = boon_pom(boon, current_boon.level + 1);

    if (next_pom !== 0) {
      const value = base_value + pom;
      const next_value = base_value + next_pom;
      const score = next_value / value - 1;

      relative_score_list.push(score);
      boon_score_list.push({ current_boon, boon, score });

      console.debug({ current_boon, boon, base_value, value, next_value });
    }
  }

  const score = chance_score(4, relative_score_list);
  console.debug('pom_porridge', { score, boon_score_list });

  return score;
}

function boon_pom(boon, level) {
  let pom = 0;

  for (let i = 0; i < level - 1; i++) {
    pom += boon.pom[i] || 0;
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

ambrosia_delight();
pom_porridge();
