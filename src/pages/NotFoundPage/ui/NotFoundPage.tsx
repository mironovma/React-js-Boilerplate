import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import styles from "./NotFoundPage.module.scss";

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
    const { t } = useTranslation();

    return (
        <div
            data-testId="NotFoundPage"
            className={classNames(styles.NotFoundPage, {}, [className])}
        >
            <h3>{t("Страница не существует")}</h3>
        </div>
    );
};
