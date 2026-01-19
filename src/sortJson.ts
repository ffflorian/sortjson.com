import JSON5 from 'json5';

export function sortRecursive(value: any): any {
  if (Array.isArray(value)) {
    return value.map(sortRecursive);
  }
  if (value !== null && typeof value === 'object') {
    const keys = Object.keys(value).sort((a, b) => a.localeCompare(b));
    const out: Record<string, any> = {};
    for (const k of keys) {
      out[k] = sortRecursive(value[k]);
    }
    return out;
  }
  return value;
}

export function sortAndFormat(input: string): string {
  const parsed = JSON5.parse(input);
  const sorted = sortRecursive(parsed);
  return JSON.stringify(sorted, null, 2) + '\n';
}
