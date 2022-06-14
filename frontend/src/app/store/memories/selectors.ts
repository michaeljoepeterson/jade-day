import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IMemoryState } from "../../models/memories/memory-state";

export const selectMemoryState = (state: any) => state.memoryState;

export const selectMemories = createSelector(
    selectMemoryState,
    (state: IMemoryState) => state.memories
)