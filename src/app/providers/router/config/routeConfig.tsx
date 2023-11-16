import { AboutPage } from "@/pages/AboutPage";
import { ArticleDetailsPage } from "@/pages/ArticleDetailsPage";
import { MainPage } from "@/pages/MainPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import {
    AppRoutes,
    getRouteAbout,
    getRouteArticleDetails,
    getRouteMain,
    getRouteNotFound,
} from "@/shared/const/router";
import { AppRoutesProps } from "@/shared/types/router";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },

    [AppRoutes.ARTICLE_DETAILS]: {
        /**
         * По адресу ./articles/${id} получим и перейдем
         * на конкретную статью.
         * В компоненте с помощью useParams получим этот id,
         * а далее в async thunk по этому id получаем данные с backend'а
         */
        path: getRouteArticleDetails(":id"),
        element: <ArticleDetailsPage />,
    },

    // 404
    [AppRoutes.NOT_FOUND]: {
        path: getRouteNotFound(),
        element: <NotFoundPage />,
    },
};
