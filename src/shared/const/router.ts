export enum AppRoutes {
    MAIN = "main",
    ABOUT = "about",
    ARTICLE_DETAILS = "article_details",
    // 404
    NOT_FOUND = "not_found",
}

export const getRouteMain = () => "/";
export const getRouteAbout = () => "/about";
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteNotFound = () => "*";

export const AppRouteByPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteAbout()]: AppRoutes.ABOUT,
    [getRouteArticleDetails("id")]: AppRoutes.ARTICLE_DETAILS,
    [getRouteNotFound()]: AppRoutes.NOT_FOUND,
};
