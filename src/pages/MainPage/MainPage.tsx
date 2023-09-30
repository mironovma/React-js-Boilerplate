import { memo } from "react";
import "./MainPage.module.scss";

interface MainPageProps {
    className?: string;
}

const MainPage = ({ className }: MainPageProps) => {
    return (
        <div className={`flex justify-center ${className}`}>
            <div className="text-center">
                <h1 className="text-2xl">
                    Hello! This is ReactJS Boilerplate!
                </h1>
                <p className="text-xl">Here is</p>
                <ul>
                    <li>Webpack</li>
                    <li>React</li>
                    <li>TypeScript</li>
                    <li>Tailwindcss</li>
                    <li>and Feature Sliced Design architecture!</li>
                </ul>
                <p className="text-xs mt-4">under construction...</p>
            </div>
        </div>
    );
};

export default memo(MainPage);
