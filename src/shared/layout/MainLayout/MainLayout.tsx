import { classNames } from "@/shared/lib/classNames";
import { ReactElement, memo } from "react";
import styles from "./MainLayout.module.scss";

interface MainLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
    sidebar: ReactElement;
    toolbar?: ReactElement;
}

export const MainLayout = memo(
    ({ className, header, content, sidebar, toolbar }: MainLayoutProps) => {
        return (
            <div className={classNames(styles.MainLayout, {}, [className])}>
                <div className={styles.sidebar}>{sidebar}</div>
                <div className={styles.content}>{content}</div>
                <div className={styles.rightbar}>
                    <div className={styles.header}>{header}</div>
                    <div className={styles.toolbar}>{toolbar}</div>
                </div>
            </div>
        );
    },
);
