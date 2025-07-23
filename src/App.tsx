import React from 'react';
import { DrawingProvider } from './context/drawingcontext';
import Toolbar from './components/toolbar';
import Canvas from './components/canvas';

const App: React.FC = () => {
  return (
    <DrawingProvider>
      <div style={{ padding: 20 }}>
        <h2>Drawing App</h2>
        <Toolbar />
        <Canvas />
      </div>
    </DrawingProvider>
  );
};

export default App;
