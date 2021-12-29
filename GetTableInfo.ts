import {DeepPick, DeepPickPath, DefaultGrammar} from "ts-deep-pick";

type PathOf2<T extends object, P extends any[] = []> = {
    [K in keyof T]:
    T[K] extends object ? ([...P, K] | PathOf2<T[K], [...P, K]>) :
        [...P, K]
}[keyof T];



type Join2<T extends string[], D extends string> =
    T extends string ? T :
        T extends [] ? '' :
            T extends [string] ? `${T[0]}` :
T extends [string, ...infer U] ?
    `${T[0]}${D}${Join2<Extract<U, string[]>, D>}` :
    string;



type ExtractKeyPath2<O extends Record<string, any>, T extends string> =
    string extends T
        ? unknown
        : T extends `${infer Start}.${infer Rest}`
    ? ExtractKeyPath2<O[Start], Rest>
    : T extends `${infer Start}`
    ? O[Start]
    : unknown;



type ExtractKeyPathsFromArray<O extends Record<string, any>, T extends string[]> =
    T extends string ? ExtractKeyPath2<O,T> :
        T extends [] ? [] :
            T extends [string] ? ExtractKeyPath2<O,T[0]> :
                T extends [string, ...infer U] ?
                    // @ts-ignore
                    [ExtractKeyPathsFromArray<O,T[0]>,ExtractKeyPathsFromArray<O,U>] :
                    [any];


type ExtractKeyPathsFromArray2<O extends Record<string, any>, T extends string[]>= {
    // @ts-ignore
    [item in keyof T]: ExtractKeyPath2<O, T[item]>
}

// @ts-ignore
export type SerializedPathOf2<T extends object> = Join2<Extract<PathOf2<T>, string[]>, '.'>;


// @ts-ignore
export async function getTableInfo<O extends {}, T extends SerializedPathOf2<O>>(o: O, callback:<K>(...paths: DeepPickPath<K, DefaultGrammar>[])=>Promise<DeepPick<K, typeof paths[number]>>, ...paths: T[]): DeepPick<O,  typeof paths[number]>{
    //@ts-ignore
    return await callback(...paths);
}
