import { memo } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { classNames } from "@/shared/lib/classNames/classNames";
import { DynamicModuleLoader } from "@/shared/lib/components/DynamicModuleLoader";
import { ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { HStack, VStack } from "@/shared/ui/Stack";

import {
    getCounterAsyncValue,
    getCounterValue,
} from "../model/selectors/getCounterValue";
import { counterActions, counterReducer } from "../model/slice/counterSlice";

import styles from "./Counter.module.scss";

interface CounterProps {
    className?: string;
}

const reducers: ReducersList = {
    counterAsync: counterReducer,
};

const CounterAsync = memo(({ className }: CounterProps) => {
    const dispatch = useAppDispatch();
    const value = useSelector(getCounterAsyncValue);

    const onMathHandler = (value: number) => {
        dispatch(counterActions.doMath(Number(value)));
    };

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(styles.Counter, {}, [className])}>
                <VStack gap="16" align="center" fullWidth>
                    <p className="text-2xl">{value}</p>
                    <HStack gap="8">
                        <button
                            className="p-2 bg-green-300 rounded-md"
                            onClick={() => onMathHandler(1)}
                        >
                            INC
                        </button>
                        <button
                            className="p-2 bg-red-300 rounded-md"
                            onClick={() => onMathHandler(-1)}
                        >
                            DEC
                        </button>
                    </HStack>
                </VStack>
            </div>
        </DynamicModuleLoader>
    );
});

const CounterPlain = memo(({ className }: CounterProps) => {
    const dispatch = useAppDispatch();
    const value = useSelector(getCounterValue);

    const onMathHandler = (value: number) => {
        dispatch(counterActions.doMath(Number(value)));
    };

    return (
        <div className={classNames(styles.Counter, {}, [className])}>
            <VStack gap="16" align="center" fullWidth>
                <p className="text-2xl">{value}</p>
                <HStack gap="8">
                    <button
                        className="p-2 bg-green-300 rounded-md"
                        onClick={() => onMathHandler(1)}
                    >
                        INC
                    </button>
                    <button
                        className="p-2 bg-red-300 rounded-md"
                        onClick={() => onMathHandler(-1)}
                    >
                        DEC
                    </button>
                </HStack>
            </VStack>
        </div>
    );
});

export const Counter = () => {
    return (
        <>
            <div className="mb-8">
                <h4 className="text-center">
                    This is async reducer, than will remove after unmounting
                    component.
                </h4>
                <CounterAsync />
            </div>
            <div className="mb-8">
                <h4 className="text-center">This is normal reducer.</h4>
                <CounterPlain />
            </div>
            <div className="mb-8">
                <h4 className="text-center">
                    Both using the same slice. Make some math, go to another
                    page and then return to main. You can inspect state with
                    Redux extensions for browser.
                </h4>
            </div>
        </>
    );
};
