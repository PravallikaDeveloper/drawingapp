import React, { useRef, useEffect, useState } from 'react';
import { useDrawing } from '../context/drawingcontext';
import { drawShape } from '../utils/drawUtils';
import { v4 as uuidv4 } from 'uuid';
import { Shape } from '../shapes/shapes';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { shapes, setShapes, currentTool, style } = useDrawing();
  const [isDrawing, setIsDrawing] = useState(false);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [freehandPoints, setFreehandPoints] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      shapes.forEach(shape => drawShape(ctx, shape));
    }
  }, [shapes]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setStart({ x: offsetX, y: offsetY });
    if (currentTool === 'freehand') {
      setFreehandPoints([{ x: offsetX, y: offsetY }]);
    }
    setIsDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !start) return;
    const { offsetX, offsetY } = e.nativeEvent;
    if (currentTool === 'freehand') {
      setFreehandPoints(prev => [...prev, { x: offsetX, y: offsetY }]);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDrawing || !start) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const id = uuidv4();
    let newShape: Shape | null = null;

    switch (currentTool) {
      case 'rectangle':
        newShape = { id, type: 'rectangle', x: start.x, y: start.y, width: offsetX - start.x, height: offsetY - start.y, ...style };
        break;
      case 'circle':
        const radius = Math.sqrt(Math.pow(offsetX - start.x, 2) + Math.pow(offsetY - start.y, 2));
        newShape = { id, type: 'circle', x: start.x, y: start.y, radius, ...style };
        break;
      case 'line':
        newShape = { id, type: 'line', x1: start.x, y1: start.y, x2: offsetX, y2: offsetY, ...style };
        break;
      case 'freehand':
        newShape = { id, type: 'freehand', points: freehandPoints, ...style };
        break;
    }

   if (newShape !== null) {
  setShapes(prev => [...prev, newShape as Shape]);
}
    setIsDrawing(false);
    setStart(null);
    setFreehandPoints([]);
  };

  return (
    <canvas
      ref={canvasRef}
      width={900}
      height={600}
      style={{ border: '1px solid #ccc', background: '#fff', cursor: 'crosshair' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      
    />
  );
};

export default Canvas;
