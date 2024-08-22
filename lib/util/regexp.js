const _source = (arg) => typeof arg === "string"
    ? arg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") // escape string
    : arg.source;
export const tag = (flags = "") => (literals, ...substitutions) => {
    const subpatterns = substitutions.map((sub) => `(?:${_source(sub)})`);
    return new RegExp(String.raw(literals, ...subpatterns), flags);
};
export const union = (strings) => ({
    source: strings.map(_source).join("|"),
});
