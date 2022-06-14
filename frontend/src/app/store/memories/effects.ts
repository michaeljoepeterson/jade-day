import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, map, switchMap, tap } from "rxjs";
import { MemoryService } from "../../modules/memories/services/memory.service";
import { getMemories, getMemoriesError, getMemoriesSuccess } from "./actions";

@Injectable()
export class MemoryEffects{
    constructor(
        private actions$:Actions,
        private memoryService: MemoryService
    ){}

    getMemories$ = createEffect(() => this.actions$.pipe(
        ofType(getMemories),
        switchMap(res => this.memoryService.getMemories()),
        tap(res => console.log('get effect', res)),
        map(memories => getMemoriesSuccess({memories})),
        catchError(error => of(getMemoriesError({error})))
    ))
}