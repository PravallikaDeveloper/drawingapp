export type ShapeType = 'rectangle' | 'circle' | 'line';

export interface ShapeBase {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  strokeColor: string;
  strokeWidth: number;
  strokeStyle: 'solid' | 'dashed';
  fillColor?: string;
}

export interface Rectangle extends ShapeBase {
  type: 'rectangle';
  width: number;
  height: number;
}

export interface Circle extends ShapeBase {
  type: 'circle';
  radius: number;
}

export interface Line extends ShapeBase {
  type: 'line';
  x2: number;
  y2: number;
}

export type Shape = Rectangle | Circle | Line;
