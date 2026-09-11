import { FormControl, InputLabel, MenuItem, Select } from '@ui';
import {
  useOrientation,
  type Orientation,
} from '@features/orientation/useOrientation';

import { RATIOS, useRatio, type Ratio } from './useRatio';

// Display-only: `ratio` state stays orientation-agnostic (see useRatio.ts),
// this just flips the label shown to the user to match the current
// orientation, e.g. `16:9` reads as `9:16` in portrait.
function formatRatio(ratio: Ratio, orientation: Orientation) {
  if (orientation === 'portrait') {
    const [long, short] = ratio.split(':');
    return `${short}:${long}`;
  }
  return ratio;
}

export function RatioSelect() {
  const [ratio, setRatio] = useRatio();
  const [orientation] = useOrientation();

  return (
    <FormControl size='small' sx={{ minWidth: 96 }}>
      <InputLabel id='ratio-select-label'>Ratio</InputLabel>
      <Select
        labelId='ratio-select-label'
        label='Ratio'
        value={ratio}
        onChange={(event) => setRatio(event.target.value)}>
        {RATIOS.map((value) => (
          <MenuItem key={value} value={value}>
            {formatRatio(value, orientation)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
