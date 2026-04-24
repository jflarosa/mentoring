import { PreviewCreativeStatic } from './features/creative-preview/components/PreviewCreativeStatic.tsx';
import { Box } from '@ui';

function App() {
  return (
    <Box display='flex' gap={10} flexDirection='column'>
      <PreviewCreativeStatic />
      <PreviewCreativeStatic />
    </Box>
  );
}

export default App;
