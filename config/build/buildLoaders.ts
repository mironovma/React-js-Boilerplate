import { RuleSetRule } from "webpack";
import { buildBabelLoader } from "./loaders/buildBabelLoader";
import { buildCssLoader } from "./loaders/buildCssLoader";
import { BuildOptions } from "./types/config";

export function buildLoaders({ isDev }: BuildOptions): RuleSetRule[] {
    const assetLoader = {
        test: /\.(png|jpe?g|gif|woff)$/i,
        type: "asset/resource",
    };

    const svgLoader = {
        test: /\.svg/,
        type: "asset/inline",
    };

    const cssLoader = buildCssLoader(isDev);

    const codeBabelLoader = buildBabelLoader({ isTsx: false, isDev });
    const tsxCodeBabelLoader = buildBabelLoader({ isTsx: true });

    return [
        assetLoader,
        svgLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        cssLoader,
    ];
}
