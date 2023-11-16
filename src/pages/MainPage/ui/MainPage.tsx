import { memo } from "react";

import { Counter } from "@/entities/Counter";
import { classNames } from "@/shared/lib/classNames/classNames";

import styles from "./MainPage.module.scss";

interface MainPageProps {
    className?: string;
}

const MainPage = memo(({ className }: MainPageProps) => {
    return (
        <div className={classNames(styles.MainPage, {}, [className])}>
            <Counter />
        </div>
    );
});

export default MainPage;
