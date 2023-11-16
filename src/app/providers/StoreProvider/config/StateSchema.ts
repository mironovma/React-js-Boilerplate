import {
    AnyAction,
    CombinedState,
    Reducer,
    ReducersMapObject,
} from "@reduxjs/toolkit";
import { EnhancedStore } from "@reduxjs/toolkit/dist/configureStore";
import { AxiosInstance } from "axios";
import { NavigateOptions, To } from "react-router-dom";

import { CounterSchema } from "@/entities/Counter";
import { rtkApi } from "@/shared/api/rtkApi";

export interface StateSchema {
    /**
     * Пример подключения обычного редюсера.
     * Сразу попадает в бандл.
     */
    counterPlain: CounterSchema;

    /**
     * Подключение rtkApi редюсера
     */
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    /**
     * Асинхронные редюсеры.
     * Такие редюсеры подключаем в компонентах с помощью
     * DynamicModuleLoader
     */
    counterAsync?: CounterSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
