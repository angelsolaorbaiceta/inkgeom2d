import Line from './line';
import Projectable from './projectable';
declare const lines: {
    makeVertical(x: number): Line;
    makeHorizontal(y: number): Line;
    makeBetween(start: Projectable, end: Projectable): Line;
};
export default lines;
