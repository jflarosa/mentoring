import { Box, styled } from '@ui';
import { useOrientation } from '@features/orientation/useOrientation';
import { orientRatio } from '@features/ratio/orientRatio';
import { useRatio } from '@features/ratio/useRatio';

import { creativeSrcDoc } from './creativeSrcDoc';
import { useCreativeUrl } from './useCreativeUrl';

// Placeholder document shown while no `creativeUrl` is set.
const PLACEHOLDER_SRC_DOC = `<!doctype html>
<html>
  <body style="display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:sans-serif;background-color:red;">
    Affichage de la créative
  </body>
</html>`;

const Frame = styled('iframe')({
  width: '100%',
  height: '100%',
  border: 0,
  display: 'block',
});

/**
 * Renders the creative preview area, sized from the global ratio and
 * orientation state. The creative itself runs inside a sandboxed iframe:
 * - `sandbox="allow-scripts"` lets the creative's JS run, nothing else —
 *   no top-level navigation, no popups, no native dialogs, so it can't
 *   affect the host app. Deliberately NOT `allow-same-origin`: the
 *   document is injected via `srcDoc`, which — unlike a cross-origin
 *   `src` — inherits the parent's own origin. Adding `allow-same-origin`
 *   on a same-origin `srcDoc` document is the textbook sandbox-escape
 *   combo (allow-scripts + allow-same-origin + same origin as the
 *   parent = the framed script can reach into the host app's window).
 *   Leaving it out gives the iframe an opaque origin instead: its script
 *   still runs, but can't touch this app's cookies/localStorage/DOM. The
 *   trade-off is that the creative also loses access to its own
 *   same-origin storage/cookies on cdn-creatives.adikteev.com — revisit
 *   if that turns out to matter for real creatives.
 * - `allow="autoplay"` is a separate mechanism (Permissions Policy, not
 *   the sandbox attribute) needed so a playable can trigger sound without
 *   a prior user gesture.
 */
export function Viewer() {
  const [ratio] = useRatio();
  const [orientation] = useOrientation();
  const [creativeUrl] = useCreativeUrl();
  const [width, height] = orientRatio(ratio, orientation);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        aspectRatio: `${width} / ${height}`,
        mx: 'auto',
        border: '1px solid',
        borderColor: 'divider',
      }}>
      <Frame
        title='Creative preview'
        srcDoc={creativeUrl ? creativeSrcDoc(creativeUrl) : PLACEHOLDER_SRC_DOC}
        sandbox='allow-scripts'
        allow='autoplay'
      />
    </Box>
  );
}
