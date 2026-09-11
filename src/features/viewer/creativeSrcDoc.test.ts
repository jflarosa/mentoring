import { describe, expect, it } from 'vitest';

import { creativeSrcDoc } from './creativeSrcDoc';

describe('creativeSrcDoc', () => {
  it('wraps the creative URL in a script tag', () => {
    const doc = creativeSrcDoc('https://cdn-creatives.adikteev.com/a.js');

    expect(doc).toContain(
      '<script src="https://cdn-creatives.adikteev.com/a.js"></script>',
    );
  });

  it('produces a full HTML document', () => {
    const doc = creativeSrcDoc('https://cdn-creatives.adikteev.com/a.js');

    expect(doc).toMatch(/^<!doctype html>/);
    expect(doc).toContain('<html>');
    expect(doc).toContain('<body');
  });

  it('escapes a malicious URL so it cannot break out of the attribute', () => {
    const doc = creativeSrcDoc('"></script><script>alert(1)</script>');

    expect(doc).not.toContain('"></script><script>alert(1)</script>');
    expect(doc).toContain(
      '<script src="&#x22;&#x3E;&#x3C;/script&#x3E;&#x3C;script&#x3E;alert(1)&#x3C;/script&#x3E;"></script>',
    );
  });
});
