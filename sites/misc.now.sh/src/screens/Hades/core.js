export function pom_total(boon, level) {
  if (!boon.pom.length) {
    return 0.0;
  }

  let pom = 0;

  for (let i = 0; i < level - 1; i++) {
    pom += pom_increment(boon, i + 1);
  }

  return pom;
}

export function pom_increment(boon, level) {
  if (!boon.pom.length) {
    return 0.0;
  }

  const trailing_pom = boon.pom[boon.pom.length - 1];
  return boon.pom[level - 1] || trailing_pom;
}
