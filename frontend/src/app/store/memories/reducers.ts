//remove memories observable from memory service
//add get memories action
//add effect for get memories action, runs memory service get mem, then sends get memories success action
//reducer responds to get success action and updates current memories 
//similar pattern for adding memories

import { createReducer, on } from "@ngrx/store";
import { IMemoryState } from "../../models/memories/memory-state";
import { getMemories, getMemoriesError, getMemoriesSuccess } from "./actions";

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
    }))
);
