import React, { useRef, useEffect, useState } from 'react';
import { Shape } from '../types/shapes';
import { v4 as uuidv4 } from 'uuid';
import { useDrawing } from '../context/drawingcontext';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { shapes, setShapes, currentTool, selectedShapeId, setSelectedShapeId } = useDrawing();
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number, y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(shape => {
      ctx.beginPath();
      ctx.setLineDash(shape.strokeStyle === 'dashed' ? [5, 3] : []);
      ctx.lineWidth = shape.strokeWidth;
      ctx.strokeStyle = shape.strokeColor;
      ctx.fillStyle = shape.fillColor || 'transparent';

      if (shape.type === 'rectangle') {
        ctx.rect(shape.x, shape.y, shape.width, shape.height);
        ctx.fill();
        ctx.stroke();
      } else if (shape.type === 'circle') {
        ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (shape.type === 'line') {
        ctx.moveTo(shape.x, shape.y);
        ctx.lineTo(shape.x2, shape.y2);
        ctx.stroke();
      }

      if (shape.id === selectedShapeId) {
        ctx.setLineDash([]);
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(shape.x - 5, shape.y - 5, 10, 10);
      }

      ctx.closePath();
    });
  }, [shapes, selectedShapeId]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    setStartPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsDrawing(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!startPos) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const newShape: Shape = (() => {
      switch (currentTool) {
        case 'rectangle':
          return {
            id: uuidv4(),
            type: 'rectangle',
            x: startPos.x,
            y: startPos.y,
            width: endX - startPos.x,
            height: endY - startPos.y,
            strokeColor: 'black',
            strokeWidth: 2,
            strokeStyle: 'solid',
            fillColor: 'lightgray',
          };
        case 'circle':
          return {
            id: uuidv4(),
            type: 'circle',
            x: startPos.x,
            y: startPos.y,
            radius: Math.hypot(endX - startPos.x, endY - startPos.y),
            strokeColor: 'black',
            strokeWidth: 2,
            strokeStyle: 'solid',
            fillColor: 'lightgray',
          };
        case 'line':
          return {
            id: uuidv4(),
            type: 'line',
            x: startPos.x,
            y: startPos.y,
            x2: endX,
            y2: endY,
            strokeColor: 'black',
            strokeWidth: 2,
            strokeStyle: 'solid',
          };
        default:
          throw new Error("Unknown tool");
      }
    })();

    setShapes(prev => [...prev, newShape]);
    setIsDrawing(false);
    setStartPos(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ border: '1px solid #ccc' }}
    />
  );
};

export default Canvas;
