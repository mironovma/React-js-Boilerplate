import { AppRoutesProps } from "@/shared/types/router";
import { Suspense, memo, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "../config/routeConfig";

const AppRouter = () => {
    /**
     * Защищенные роуты ниже:
     * https://github.com/remix-run/react-router/blob/dev/examples/auth/src/App.tsx
     */

    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={"Loading..."}>{route.element}</Suspense>
        );
        return <Route key={route.path} path={route.path} element={element} />;
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
