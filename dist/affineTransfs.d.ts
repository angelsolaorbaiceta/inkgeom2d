import AffineTransf from './affineTransf';
import Angle from './angle';
import Projectable from './projectable';
import Rect from './rect';
declare const transforms: {
    makeTranslation(tx: number, ty: number): AffineTransf;
    makeScaling(sx: number, sy: number, center?: Projectable): AffineTransf;
    makeRotation(angle: Angle, center?: Projectable): AffineTransf;
    makeToFitRectInside(fit: Rect, fixed: Rect, factor?: number): AffineTransf;
    combineSequences(first: AffineTransf[], second: AffineTransf[]): AffineTransf[];
};
export default transforms;
