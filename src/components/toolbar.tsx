import React from 'react';
import { ShapeType } from '../types/shapes';
import { useDrawing } from '../context/drawingcontext';

const Toolbar: React.FC = () => {
  const { currentTool, setCurrentTool } = useDrawing();

  const tools: ShapeType[] = ['rectangle', 'circle', 'line'];

  return (
    <div style={{ marginBottom: '10px' }}>
      {tools.map(tool => (
        <button
          key={tool}
          onClick={() => setCurrentTool(tool)}
          style={{
            marginRight: 5,
            backgroundColor: currentTool === tool ? 'lightblue' : ''
          }}
        >
          {tool}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
