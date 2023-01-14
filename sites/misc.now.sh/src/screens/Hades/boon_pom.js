export function boon_pom(boon, level) {
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
