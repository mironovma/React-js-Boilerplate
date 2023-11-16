import babelRemovePropsPlugin from "../../babel/babelRemovePropsPlugin";

interface BuildBabelLoaderProps {
    isTsx?: boolean;
    isDev?: boolean;
}

export function buildBabelLoader({ isTsx, isDev }: BuildBabelLoaderProps) {
    const isProd = !isDev;
    return {
        test: isTsx ? /\.(|ts|tsx)$/ : /\.(|js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                cacheDirectory: true,
                presets: ["@babel/preset-env"],
                plugins: [
                    "@babel/plugin-transform-runtime",
                    isTsx &&
                        isProd && [
                            babelRemovePropsPlugin,
                            { props: ["data-testid"] },
                        ],
                ],
            },
        },
    };
}
