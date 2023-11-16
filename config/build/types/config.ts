export type BuildMode = "development" | "production";

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
    /**
     * Путь до папки с переводами
     */
    locales: string;
    /**
     * Путь до папки билда
     */
    buildPath: string;
}

export interface BuildEnv {
    mode: BuildMode;
    port: number;
    apiUrl: string;
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
    apiUrl: string;
}
