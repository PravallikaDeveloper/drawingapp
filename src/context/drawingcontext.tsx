import React, { createContext, useContext, useState } from 'react';
import { Shape, ShapeType } from '../shapes/shapes';

interface DrawingContextType {
  shapes: Shape[];
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  currentTool: ShapeType;
  setCurrentTool: (type: ShapeType) => void;
  style: ShapeStyle;
  setStyle: React.Dispatch<React.SetStateAction<ShapeStyle>>;
}

export interface ShapeStyle {
  strokeStyle: string;
  fillStyle: string;
  lineWidth: number;
  lineDash: number[];
}

const DrawingContext = createContext<DrawingContextType>({} as any);
export const useDrawing = () => useContext(DrawingContext);

export const DrawingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentTool, setCurrentTool] = useState<ShapeType>('rectangle');
  const [style, setStyle] = useState<ShapeStyle>({
    strokeStyle: '#000000',
    fillStyle: '#cccccc',
    lineWidth: 2,
    lineDash: [],
  });

  return (
    <DrawingContext.Provider
      value={{ shapes, setShapes, selectedId, setSelectedId, currentTool, setCurrentTool, style, setStyle }}
    >
      {children}
    </DrawingContext.Provider>
  );
};