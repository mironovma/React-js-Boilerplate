import { memo } from "react";
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './[FTName].module.scss';

interface [FTName]Props {
    className?: string;
}

export const [FTName] = memo(({className}: [FTName]Props) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(styles.[FTName], {}, [className])}>
            
        </div>
    );
});