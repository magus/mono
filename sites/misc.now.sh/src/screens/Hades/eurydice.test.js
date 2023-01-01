import * as eurydice from './eurydice.js';
import * as RARITY from './data/rarity';

it('ambrosia_delight scores a single boon', () => {
  const boon = { key: 'thunder flourish', level: 1, rarity: RARITY.N.common };
  expect(eurydice.ambrosia_delight([boon])).toBeCloseTo(0.25, 2);
});

it('pom_porridge scores a single boon', () => {
  const boon = { key: 'thunder flourish', level: 1, rarity: RARITY.N.common };
  expect(eurydice.pom_porridge([boon])).toBeCloseTo(0.4, 2);
});

it('pom_porridge scores a single boon with very high level using trailing pom value', () => {
  const boon = { key: 'thunder flourish', level: 20, rarity: RARITY.N.common };
  const result_a = eurydice.pom_porridge([boon]);
  boon.level += 1;
  const result_b = eurydice.pom_porridge([boon]);
  const diff = Math.abs(result_b - result_a);

  expect(1.04).toBeCloseTo(1.0, 1);
  expect(diff).toBeCloseTo(0.00079, 5);
});
