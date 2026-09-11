import { AppBar, Box, Stack, Toolbar, Typography } from '@ui';
import { ModeToggle } from '@features/mode/ModeToggle';
import { OrientationToggle } from '@features/orientation/OrientationToggle';
import { RatioSelect } from '@features/ratio/RatioSelect';

function App() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Creative Preview
        </Typography>
        <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
          <RatioSelect />
          <OrientationToggle />
          <Box>
            <ModeToggle />
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default App;
