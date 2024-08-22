import { Node } from "../deps.node.js";
const https = /^https:\//;
/**
 * Rewrites specifiers in `sourceFile` to point into  the specified `vendorDir`.
 * @param vendorDir - absolute path
 */
export const vendorSpecifiers = (vendorDir) => (sourceFile) => {
    for (const statement of sourceFile.getStatements()) {
        if (Node.isImportDeclaration(statement) ||
            Node.isExportDeclaration(statement)) {
            const oldSpecifierValue = statement.getModuleSpecifierValue();
            if (oldSpecifierValue === undefined)
                continue;
            if (!https.test(oldSpecifierValue))
                continue;
            const newSpecifierValue = "./" + sourceFile.getRelativePathTo(oldSpecifierValue.replace(https, vendorDir)).replace(/tsx?$/, "js");
            statement.setModuleSpecifier(newSpecifierValue);
        }
    }
};
export function vendorEverything(ctx) {
    if (!ctx.config.vendorDir)
        return;
    console.time("Vendoring");
    ctx.project.getSourceFiles().forEach(vendorSpecifiers(ctx.resolve(ctx.config.vendorDir)));
    console.timeEnd("Vendoring");
}
