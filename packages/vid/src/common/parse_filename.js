export function parse_filename(input) {
  const match = input.match(RE.filename);

  if (match) {
    const groups = match.groups;
    const full = `${groups.name}.${groups.extension}`;
    return { ...groups, full, input };
  }
}

const RE = {
  filename: /(?<name>[^\\^/]*?)\.(?<extension>[^.]+)$/i,
};
