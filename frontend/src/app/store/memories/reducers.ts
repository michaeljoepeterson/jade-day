import { createReducer, on } from "@ngrx/store";
import { IMemoryState } from "../../models/memories/memory-state";
import { createMemory, createMemorySuccess, getMemories, getMemoriesError, getMemoriesSuccess } from "./actions";

const initialState: IMemoryState = {
    memories: [],
    error: null,
    loading: false
}

export const MemoryReducer = createReducer(
    initialState,
    
    on(getMemories, (state) => ({
        ...state,
        loading: true
    })),

    on(getMemoriesSuccess, (state, {memories}) => ({
        ...state,
        error: null,
        loading: false,
        memories
    })),

    on(getMemoriesError, (state, {error}) => ({
        ...state,
        error: error,
        loading: false,
        memories: []
    })),

    on(createMemory, (state) => ({
        ...state,
        loading: true
    })),

    on(createMemorySuccess, (state, {memory}) => ({
        ...state,
        error: null,
        loading: false,
        memories: [...state.memories, memory]
    })),
);
