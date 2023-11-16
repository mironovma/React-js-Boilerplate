import {
    getRouteAbout,
    getRouteArticleDetails,
    getRouteMain,
} from "@/shared/const/router";
import { AppLink } from "@/shared/ui/AppLink";
import { HStack } from "@/shared/ui/Stack";
import { AppRouter } from "./providers/router";

interface RouteProps {
    path: string;
    text: string;
}

const routes: RouteProps[] = [
    {
        path: getRouteMain(),
        text: "Главная",
    },
    {
        path: getRouteAbout(),
        text: "О нас",
    },
    {
        path: getRouteArticleDetails("5"),
        text: "Пятая статья",
    },
];

const routeItems = routes.map(({ path, text }) => (
    <AppLink key={path} to={path}>
        {text}
    </AppLink>
));

function App() {
    return (
        <>
            <AppRouter />
            <HStack gap="8" fullWidth justify="center">
                {routeItems}
            </HStack>
        </>
    );
}

export default App;
