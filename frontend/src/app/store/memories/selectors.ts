import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IMemoryState } from "../../models/memories/memory-state";

export const selectMemoryState = createFeatureSelector<IMemoryState>('memoryState');

export const selectMemories = createSelector(
    selectMemoryState,
    (state: IMemoryState) => state.memories
);

export const selectMemoriesLoading = createSelector(
    selectMemoryState,
    (state: IMemoryState) => state.loading
);