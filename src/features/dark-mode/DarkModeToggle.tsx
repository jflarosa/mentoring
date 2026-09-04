import { Button } from '@ui';

import { useColorMode } from './useColorMode';

export function DarkModeToggle() {
  const [mode, setMode] = useColorMode();

  return (
    <Button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
      {mode === 'dark' ? 'Light mode' : 'Dark mode'}
    </Button>
  );
}
