import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { NuqsAdapter } from 'nuqs/adapters/react';

import { Root } from './Root.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <Root />
    </NuqsAdapter>
  </StrictMode>,
);
