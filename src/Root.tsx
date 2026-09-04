import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider, createTheme } from '@ui';
import { useColorMode } from '@features/dark-mode/useColorMode';

import App from './App.tsx';

const queryClient = new QueryClient();

export function Root() {
  const [mode] = useColorMode();
  const theme = createTheme({ palette: { mode } });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
