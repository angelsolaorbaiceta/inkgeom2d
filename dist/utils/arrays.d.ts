export declare function isEmpty(array: unknown[]): boolean;
export declare function range(n: number): number[];
export declare function zip<A, B>(a: A[], b: B[]): Array<[A, B]>;
export declare function zipWith<A, B, C>(a: A[], b: B[], zipFn: (a: A, b: B) => C): C[];
