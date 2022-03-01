import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {NewsService} from "../../../services/news/news.service";
import {catchError, map, mergeMap, Observable, of, switchMap} from "rxjs";
import {Action} from "@ngrx/store";
import {ENewsActions, ShowAllAction, ShowAllSuccessAction} from "../actions/news.actions";
import {PaginatedResponse} from "../../../model/PaginatedResponse";
import {News} from "../../../model/News";

@Injectable()
export class NewsEffects {
  constructor(private actions$: Actions, private newsService: NewsService) {}

  loadAllMovies$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<ShowAllAction>(ENewsActions.SHOW_ALL),
      switchMap(action => {
        return this.newsService.getAll(action.page,action.pageSize, action.title).pipe(
          map((data: PaginatedResponse<News>) => {
            return new ShowAllSuccessAction(data);
          })
        )}
      )
    );
  });

  /*loadAllMovies$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<ShowAllAction>(ENewsActions.SHOW_ALL),
      switchMap(action =>
        this.newsService.getAll(1,5).pipe(
          map((data: PaginatedResponse<News>) => {
            return new ShowAllSuccessAction(data);
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    );
  });*/

}
