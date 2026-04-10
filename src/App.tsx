import { PreviewCreativeStatic } from './features/creative-preview/components/PreviewCreativeStatic.tsx';

function App() {
  return (
    <div>
      <PreviewCreativeStatic action='decrement' />
      <PreviewCreativeStatic step={10} action='increment' />
    </div>
  );
}

export default App;
