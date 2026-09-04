import {
  DarkModeIcon,
  FormControlLabel,
  LightModeIcon,
  Switch,
  styled,
} from '@ui';

import { useColorMode } from './useColorMode';

const Thumb = styled('span')(({ theme }) => ({
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'width': 20,
  'height': 20,
  'borderRadius': '50%',
  'backgroundColor':
    theme.palette.mode === 'dark'
      ? theme.palette.grey[900]
      : theme.palette.background.paper,
  '& svg': {
    fontSize: 14,
  },
}));

export function ModeToggle() {
  const [mode, setMode] = useColorMode();
  const isDark = mode === 'dark';

  return (
    <FormControlLabel
      control={
        <Switch
          checked={isDark}
          onChange={(_, checked) => setMode(checked ? 'dark' : 'light')}
          icon={
            <Thumb>
              <LightModeIcon />
            </Thumb>
          }
          checkedIcon={
            <Thumb>
              <DarkModeIcon />
            </Thumb>
          }
        />
      }
      label={isDark ? 'Dark mode' : 'Light mode'}
    />
  );
}
