import { Shape } from "../shapes/shapes";


export const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape) => {
  ctx.save();
  ctx.setLineDash(shape.lineDash);
  ctx.strokeStyle = shape.strokeStyle;
  ctx.lineWidth = shape.lineWidth;
  ctx.fillStyle = shape.fillStyle;
  ctx.beginPath();

  switch (shape.type) {
    case 'rectangle':
      ctx.rect(shape.x, shape.y, shape.width, shape.height);
      ctx.fill();
      ctx.stroke();
      break;
    case 'circle':
      ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      break;
    case 'line':
      ctx.moveTo(shape.x1, shape.y1);
      ctx.lineTo(shape.x2, shape.y2);
      ctx.stroke();
      break;
    case 'freehand':
      shape.points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
      break;
  }

  ctx.restore();
};
