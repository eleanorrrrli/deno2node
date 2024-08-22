import * as re from "../util/regexp.js";
export const name = /(?:@[\w.-]+\/)?[\w.-]+/;
const version = /[^/?]+/;
const path = /\/[^?]*/;
const patterns = [
    re.tag() `^npm:(${name})(?:@${version})?(${path})?`,
    re.tag() `^https://esm\.sh/(${name})(?:@${version})?(${path})?`,
    re.tag() `^https://cdn\.skypack\.dev/(${name})(?:@${version})?(${path})?`,
    re.tag() `^https://deno\.land/std(?:@${version})?/node/([\w/]+)\.ts$`,
    re.tag() `^https://nest\.land/std/node/${version}/([\w/]+)\.ts$`,
];
const transpileHttpsImport = (specifier) => {
    for (const pattern of patterns) {
        const match = pattern.exec(specifier);
        if (match === null)
            continue;
        const [, pkg, path = ""] = match;
        return pkg + path;
    }
    return specifier;
};
const transpileRelativeImport = (specifier) => specifier
    .replace(/\.[jt]sx?$/i, ".js")
    .replace(/\.deno\.js$/i, ".node.js");
const isRelative = (specifier) => /^\.\.?\//.test(specifier);
export const transpileSpecifier = (specifier) => {
    if (isRelative(specifier))
        return transpileRelativeImport(specifier);
    return transpileHttpsImport(specifier);
};
