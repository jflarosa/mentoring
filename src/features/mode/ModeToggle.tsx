import { ToggleButton } from '@ui';

import { useColorMode } from './useColorMode';

export function ModeToggle() {
  const [mode, setMode] = useColorMode();
  const isDark = mode === 'dark';

  return (
    <ToggleButton
      value='dark'
      selected={isDark}
      onChange={() => setMode(isDark ? 'light' : 'dark')}>
      {isDark ? 'Dark mode' : 'Light mode'}
    </ToggleButton>
  );
}
