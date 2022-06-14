import { createAction, props } from "@ngrx/store";
import { Memory } from "../../models/memories/memory";

export const getMemories = createAction(
    `[memory] get`
);

export const getMemoriesSuccess = createAction(
    `[memory] get success`,
    props<{memories: Memory[]}>()
);

export const getMemoriesError = createAction(
    `[memory] get error`,
    props<{error: any}>()
);
