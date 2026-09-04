import { AppBar, Box, Toolbar, Typography } from '@ui';
import { ModeToggle } from '@features/mode/ModeToggle';

function App() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Creative Preview
        </Typography>
        <Box>
          <ModeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default App;
