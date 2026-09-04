import { DarkModeIcon, FormControlLabel, LightModeIcon, Switch } from '@ui';

import { useColorMode } from './useColorMode';

export function ModeToggle() {
  const [mode, setMode] = useColorMode();
  const isDark = mode === 'dark';

  return (
    <FormControlLabel
      control={
        <Switch
          checked={isDark}
          onChange={(_, checked) => setMode(checked ? 'dark' : 'light')}
          icon={<LightModeIcon />}
          checkedIcon={<DarkModeIcon />}
        />
      }
      label={isDark ? 'Dark mode' : 'Light mode'}
    />
  );
}
