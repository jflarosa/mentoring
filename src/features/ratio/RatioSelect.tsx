import { FormControl, InputLabel, MenuItem, Select } from '@ui';
import { useOrientation } from '@features/orientation/useOrientation';

import { orientRatio } from './orientRatio';
import { RATIOS, useRatio } from './useRatio';

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
        {RATIOS.map((value) => {
          const [width, height] = orientRatio(value, orientation);
          return (
            <MenuItem key={value} value={value}>
              {width}:{height}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
