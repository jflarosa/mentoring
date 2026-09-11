import {
  IconButton,
  StayCurrentLandscapeIcon,
  StayCurrentPortraitIcon,
  Tooltip,
} from '@ui';

import { useOrientation } from './useOrientation';

// Single toggle button, à la Chrome DevTools device toolbar: the icon
// itself reflects the current orientation, clicking it flips to the other.
export function OrientationToggle() {
  const [orientation, setOrientation] = useOrientation();
  const isPortrait = orientation === 'portrait';

  return (
    <Tooltip title={isPortrait ? 'Rotate to landscape' : 'Rotate to portrait'}>
      <IconButton
        onClick={() => setOrientation(isPortrait ? 'landscape' : 'portrait')}
        aria-label='Toggle orientation'>
        {isPortrait ? (
          <StayCurrentPortraitIcon />
        ) : (
          <StayCurrentLandscapeIcon />
        )}
      </IconButton>
    </Tooltip>
  );
}
