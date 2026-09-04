import { FormControlLabel, Switch } from '@ui';

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
        />
      }
      label={isDark ? 'Dark mode' : 'Light mode'}
    />
  );
}
