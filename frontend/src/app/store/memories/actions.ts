import { createAction, props } from "@ngrx/store";
import { INewMemory } from "../../models/memories/new-memory";
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

export const createMemory = createAction(
    `[memory] create`,
    props<{memory: INewMemory, imageFile: File}>()
);

export const createMemorySuccess = createAction(
    `[memory] create success`,
    props<{memory: Memory}>()
);
