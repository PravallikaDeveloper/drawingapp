import React, { createContext, useContext, useState } from 'react';
import { Shape, ShapeType } from '../types/shapes';

interface DrawingContextProps {
  shapes: Shape[];
  selectedShapeId: string | null;
  currentTool: ShapeType;
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>;
  setSelectedShapeId: (id: string | null) => void;
  setCurrentTool: (tool: ShapeType) => void;
}

const DrawingContext = createContext<DrawingContextProps>({} as any);

export const useDrawing = () => useContext(DrawingContext);

export const DrawingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [currentTool, setCurrentTool] = useState<ShapeType>('rectangle');

  return (
    <DrawingContext.Provider value={{
      shapes,
      setShapes,
      selectedShapeId,
      setSelectedShapeId,
      currentTool,
      setCurrentTool
    }}>
      {children}
    </DrawingContext.Provider>
  );
};
