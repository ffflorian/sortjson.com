import {describe, it, expect} from 'vitest';
import {sortAndFormat} from '../sortJson';

describe('sortAndFormat', () => {
  it('sorts object keys alphabetically', () => {
    const res = sortAndFormat('{"b":1,"a":2}');
    expect(res).toBe(`{
  "a": 2,
  "b": 1
}
`);
  });

  it('sorts nested objects recursively', () => {
    const res = sortAndFormat('{"z":{"b":2,"a":1},"a":3}');
    expect(res).toBe(`{
  "a": 3,
  "z": {
    "a": 1,
    "b": 2
  }
}
`);
  });

  it('preserves arrays order', () => {
    const res = sortAndFormat('{"arr":[{"b":2,"a":1},{"d":4,"c":3}]}');
    expect(res).toBe(`{
  "arr": [
    {
      "a": 1,
      "b": 2
    },
    {
      "c": 3,
      "d": 4
    }
  ]
}
`);
  });

  it('formats with two-space indentation and trailing newline', () => {
    const res = sortAndFormat('{"b":1,"a":2}');
    expect(res.endsWith('\n')).toBe(true);
    expect(res.split('\n')[0]).toBe('{');
  });

  it('throws on invalid JSON', () => {
    expect(() => sortAndFormat('{invalid:}')).toThrow();
  });
});
