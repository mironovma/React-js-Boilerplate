import { classNames } from "@/shared/lib/classNames/classNames";
import { FC, ReactNode, memo } from "react";
import { LinkProps, NavLink } from "react-router-dom";
import styles from "./AppLink.module.scss";

export type AppLinkVarian = "primary" | "secondary" | "red";

interface AppLinkProps extends LinkProps {
    className?: string;
    children?: ReactNode;
    activeClassName?: string;
}

export const AppLink: FC<AppLinkProps> = memo((props) => {
    const {
        to,
        className,
        children,
        activeClassName = "",
        ...otherProps
    } = props;

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames(styles.AppLink, { [activeClassName]: isActive }, [
                    className,
                ])
            }
            {...otherProps}
        >
            {children}
        </NavLink>
    );
});
