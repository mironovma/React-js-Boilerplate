import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CounterSchema } from "../types/CounterSchema";

const initialState: CounterSchema = {
    value: 0,
};

const counterSlice = createSlice({
    initialState,
    name: "entities/counterSlice",
    reducers: {
        doMath: (state, { payload }: PayloadAction<number>) => {
            state.value = state.value + payload;
        },
    },
});

export const { actions: counterActions, reducer: counterReducer } =
    counterSlice;
