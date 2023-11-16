import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { Mods, classNames } from "@/shared/lib/classNames/classNames";
import styles from "./Flex.module.scss";

/**
 * В зависимости от роли, подбираем
 * семантически правильный html-тег для компонента
 */
type DivProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;
/**
 * А далее пропсами передаем "role", где можем
 * передать нужный нам тэг (см. любой компонент, использующий
 * дизайн систему и использующий тег role).
 */

export interface FlexProps extends DivProps {
    className?: string;
    children: ReactNode;
    justify?: FlexJustify;
    align?: FlexAlign;
    direction?: FlexDirection;
    wrap?: FlexWrap;
    gap?: FlexGap;
    fullWidth?: boolean;
}

export type FlexJustify = "start" | "center" | "end" | "between";
export type FlexAlign = "start" | "center" | "end";
export type FlexDirection = "row" | "column";
export type FlexWrap = "nowrap" | "wrap";
export type FlexGap = "4" | "8" | "16" | "24" | "32";

const justifyClasses: Record<FlexJustify, string> = {
    start: styles.justifyStart,
    center: styles.justifyCenter,
    end: styles.justifyEnd,
    between: styles.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
    column: styles.directionColumn,
    row: styles.directionRow,
};

const gapClasses: Record<FlexGap, string> = {
    "4": styles.gap4,
    "8": styles.gap8,
    "16": styles.gap16,
    "24": styles.gap24,
    "32": styles.gap32,
};

export const Flex = ({
    className,
    children,
    justify = "start",
    align = "center",
    direction = "row",
    wrap = "nowrap",
    gap,
    fullWidth,
    ...otherProps
}: FlexProps) => {
    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        styles[wrap],
        gap && gapClasses[gap],
    ];

    const mods: Mods = {
        [styles.fullWidth]: fullWidth,
    };

    return (
        <div className={classNames(styles.Flex, mods, classes)} {...otherProps}>
            {children}
        </div>
    );
};
