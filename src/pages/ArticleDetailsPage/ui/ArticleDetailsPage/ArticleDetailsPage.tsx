import { classNames } from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import { useParams } from "react-router-dom";
import styles from "./ArticleDetailsPage.module.scss";

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = memo(({ className }: ArticleDetailsPageProps) => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className={classNames(styles.ArticleDetailsPage, {}, [className])}>
            Page number {id}
        </div>
    );
});

export default ArticleDetailsPage;
