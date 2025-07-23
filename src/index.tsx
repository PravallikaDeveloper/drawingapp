import React from 'react';
import { DrawingProvider } from './context/drawingcontext';
import Canvas from './components/canvas';
import Toolbar from './components/toolbar';

const App: React.FC = () => {
  return (
    <DrawingProvider>
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h2>🎨 Drawing Canvas</h2>
        <Toolbar />
        <Canvas />
      </div>
    </DrawingProvider>
  );
};

export default App;
