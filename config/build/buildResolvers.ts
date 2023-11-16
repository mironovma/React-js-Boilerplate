import { ResolveOptions } from "webpack";
import { BuildOptions } from "./types/config";

export function buildResolvers({ paths }: BuildOptions): ResolveOptions {
    return {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
        preferAbsolute: true,
        modules: [paths.src, "node_modules"],
        alias: {
            "@": paths.src,
        },
        mainFiles: ["index"],
    };
}
