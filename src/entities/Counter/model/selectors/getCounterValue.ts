import { StateSchema } from "@/app/providers/StoreProvider";

export const getCounterAsyncValue = (state: StateSchema) =>
    state.counterAsync?.value;

export const getCounterValue = (state: StateSchema) => state.counterPlain.value;
