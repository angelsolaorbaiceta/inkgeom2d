import Projectable from './projectable';
import Rect from './rect';
declare const rects: {
    makeContainingPoints(points: Projectable[]): Rect;
    makeContainingPointsAndMargin(points: Projectable[], margin: number): Rect;
    makeIncludingPoints(rect: Rect, points: Projectable[]): Rect;
    makeRectCentered(center: Projectable, width: number, height: number): Rect;
};
export default rects;
