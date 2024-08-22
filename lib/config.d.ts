export interface Config {
    readonly shim?: string;
    readonly vendorDir?: string;
}
export declare function parse({ shim, vendorDir, ...rest }: any): Config;
