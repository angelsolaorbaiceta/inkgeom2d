export default class TParam {
    static readonly min: TParam;
    static readonly middle: TParam;
    static readonly max: TParam;
    readonly value: number;
    get percentage(): number;
    private constructor();
    static isValid(t: number): boolean;
    static tryMake(value: number): TParam;
    static makeValid(value: number): TParam;
}
