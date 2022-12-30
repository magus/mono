export function to_map(keyFn, list) {
  const map = {};

  for (const item of list) {
    map[keyFn(item)] = item;
  }

  return map;
}

export function to_enum(list) {
  const map = {};
  map.__size = list.length;

  for (let i = 0; i < list.length; i++) {
    const name = list[i];
    map[name] = name;
  }

  return map;
}

export function to_numeric_enum(list) {
  const map = {};
  map.__size = list.length;

  for (let i = 0; i < list.length; i++) {
    const name = list[i];
    map[name] = i;
    map[i] = name;
  }

  return map;
}
