import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, map, switchMap, tap, EMPTY } from "rxjs";
import { MemoryService } from "../../modules/memories/services/memory.service";
import { createMemory, createMemorySuccess, getMemories, getMemoriesError, getMemoriesSuccess } from "./actions";

@Injectable()
export class MemoryEffects{
    constructor(
        private actions$:Actions,
        private memoryService: MemoryService
    ){}

    getMemories$ = createEffect(() => this.actions$.pipe(
        ofType(getMemories),
        switchMap(res => this.memoryService.getMemories()),
        map(memories => getMemoriesSuccess({memories})),
        catchError(error => of(getMemoriesError({error})))
    ))

    createMemory$ = createEffect(() => this.actions$.pipe(
        ofType(createMemory),
        switchMap(res => this.memoryService.createMemory(res.memory, res.imageFile)),
        tap(res => console.log('create effect', res)),
        map(memory => createMemorySuccess({memory})),
        catchError(error => EMPTY)
    ))
}