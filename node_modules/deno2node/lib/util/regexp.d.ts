export type RegExpSource = Pick<RegExp, "source">;
export declare const tag: (flags?: string) => (literals: TemplateStringsArray, ...substitutions: ReadonlyArray<string | RegExpSource>) => RegExp;
export declare const union: (strings: ReadonlyArray<string | RegExpSource>) => RegExpSource;
