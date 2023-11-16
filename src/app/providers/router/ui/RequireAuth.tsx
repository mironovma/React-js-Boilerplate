interface RequireAuthProps {
    children: JSX.Element;
}

export function RequireAuth({ children }: RequireAuthProps) {
    // if (!auth) {
    //     return (
    //         <Navigate to={getRouteMain()} state={{ from: location }} replace />
    //     );
    // }

    return children;
}
