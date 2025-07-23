import React from 'react';
import { useDrawing } from '../context/drawingcontext';

const Toolbar: React.FC = () => {
  const { currentTool, setCurrentTool, style, setStyle, shapes, setShapes } = useDrawing();

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
      <select value={currentTool} onChange={(e) => setCurrentTool(e.target.value as any)}>
        <option value="rectangle">Rectangle</option>
        <option value="circle">Circle</option>
        <option value="line">Line</option>
        <option value="freehand">Freehand</option>
      </select>
      <input type="color" value={style.strokeStyle} onChange={(e) => setStyle({ ...style, strokeStyle: e.target.value })} />
      <input type="color" value={style.fillStyle} onChange={(e) => setStyle({ ...style, fillStyle: e.target.value })} />
      <input type="number" min={1} value={style.lineWidth} onChange={(e) => setStyle({ ...style, lineWidth: parseInt(e.target.value) })} />
      <button onClick={() => setStyle({ ...style, lineDash: style.lineDash.length ? [] : [5, 5] })}>
        {style.lineDash.length ? 'Solid' : 'Dashed'}
      </button>
      <button onClick={() => localStorage.setItem('drawing', JSON.stringify(shapes))}>Save</button>
      <button onClick={() => setShapes(JSON.parse(localStorage.getItem('drawing') || '[]'))}>Load</button>
      <button onClick={() => setShapes([])}>Clear</button>
    </div>
  );
};

export default Toolbar;
