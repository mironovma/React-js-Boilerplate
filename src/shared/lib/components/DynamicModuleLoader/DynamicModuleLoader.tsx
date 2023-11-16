import {
    ReduxStoreWithManager,
    StateSchema,
    StateSchemaKey,
} from "@/app/providers/StoreProvider";
import { Reducer } from "@reduxjs/toolkit";
import { ReactNode, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";

/**
 * Для оптимизации frontend-приложений используются разные методы.
 * Одним из является асинхронная подгрузка редюсеров.
 *
 * Это HOC (Hight Order Component) для динамичной подгрузки редюсеров.
 * Пользователь, может быть, и не воспользуется к-л редюсером, а
 * загружать будет весь бандл с редюсером. А что если редюсров более сотни?
 *
 * Поэтому важно делать некоторые редюсеры асинхронными, чтобы
 * бандл был разбит на чанки и весил меньше.
 */

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderProps {
    children: ReactNode;
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader = ({
    children,
    reducers,
    removeAfterUnmount = true,
}: DynamicModuleLoaderProps) => {
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    // При рендере асинхронный редюсер добавляем, а на анмаунте удаляем
    useEffect(() => {
        // Получаем список всех редюсеров, далее...
        const mountedReducers = store.reducerManager.getReducerMap();

        Object.entries(reducers).forEach(([name, reducer]) => {
            // ... достаем нужный редюсер по ключу и проверяем...
            const mounted = mountedReducers[name as StateSchemaKey];
            // и, если он уже вмонтирован, то не монтируем и наоборот
            // Добавляем новый редюсер, только если его нет (избегаем повторного монитрования редюсеров)
            if (!mounted) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });
        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
    }, [dispatch, reducers, removeAfterUnmount, store.reducerManager]);

    return <>{children}</>;
};
