export type ShapeType = 'rectangle' | 'circle' | 'line' | 'freehand';

export interface BaseShape {
  id: string;
  type: ShapeType;
  strokeStyle: string;
  fillStyle: string;
  lineWidth: number;
  lineDash: number[];
}

export interface Rectangle extends BaseShape {
  type: 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Circle extends BaseShape {
  type: 'circle';
  x: number;
  y: number;
  radius: number;
}

export interface Line extends BaseShape {
  type: 'line';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface Freehand extends BaseShape {
  type: 'freehand';
  points: { x: number; y: number }[];
}

export type Shape = Rectangle | Circle | Line | Freehand;
