import path from 'node:path';

export function parse_filename(filepath) {
  const match = path.basename(filepath).match(RE.filename);

  if (match) {
    const groups = match.groups;
    const full = `${groups.name}.${groups.extension}`;
    return { ...groups, full };
  }
}

const RE = {
  filename: /(?<name>.*?)\.(?<extension>[^.]+)$/i,
};
