import { encode } from 'he';

// `creativeUrl` points at the creative's raw JS bundle, not a page — an
// iframe can't just navigate `src` to that URL (the browser would only
// display the script's source text, not execute it). It has to be loaded
// from inside an HTML document instead, so this builds a minimal one with
// a <script> tag pointing at it. `creativeUrl` comes straight from the URL
// query string, so it's user-controlled — encoded via `he` (WHATWG-spec
// HTML entity encoding) rather than a hand-rolled escape, since getting
// this wrong is a classic source of XSS bugs.
export function creativeSrcDoc(creativeUrl: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;">
    <script src="${encode(creativeUrl)}"></script>
  </body>
</html>`;
}
