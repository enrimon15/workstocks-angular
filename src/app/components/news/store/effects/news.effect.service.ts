import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {NewsService} from "../../../../services/news/news.service";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {Action} from "@ngrx/store";
import {
  AddLikeAction,
  CheckLikeAction, LikeSuccessAction,
  ENewsActions, HandleLikeFailureAction, RemoveLikeAction,
  ShowAllAction,
  ShowAllSuccessAction,
  ShowDetailsAction,
  ShowDetailsSuccessAction
} from "../actions/news.actions";
import {PaginatedResponse} from "../../../../model/PaginatedResponse";
import {News} from "../../../../model/News";
import {Check} from "../../../../model/Check";
import {AlertService} from "../../../../services/alert/alert.service";

@Injectable()
export class NewsEffects {
  constructor(private actions$: Actions, private newsService: NewsService, private alertService: AlertService) {}

  loadAllNews$: Observable<Action> = createEffect(() => {
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

  loadNews$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<ShowDetailsAction>(ENewsActions.SHOW_DETAILS),
      switchMap(action =>
        this.newsService.getById(action.id).pipe(
          map((data: News) => {
            return new ShowDetailsSuccessAction(data);
          })
        )
      )
    );
  });

  checkLike$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<CheckLikeAction>(ENewsActions.CHECK_LIKE),
      switchMap(action =>
        this.newsService.checkLike(action.newsId).pipe(
          map((data: Check) => {
            return new LikeSuccessAction(data.result);
          })
        )
      )
    );
  });

  addLike$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<AddLikeAction>(ENewsActions.ADD_LIKE),
      switchMap(action =>
        this.newsService.addLike(action.newsId).pipe(
          map(() => {
            return new LikeSuccessAction(true);
          }),
          catchError((error: Error) => {
            return of(new HandleLikeFailureAction(false));
            this.alertService.showError('error.error','');
          })
        )
      )
    );
  });

  removeLike$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType<RemoveLikeAction>(ENewsActions.REMOVE_LIKE),
      switchMap(action =>
        this.newsService.removeLike(action.newsId).pipe(
          map(() => {
            return new LikeSuccessAction(false);
          }),
          catchError((error: Error) => {
            this.alertService.showError('error.error','');
            return of(new HandleLikeFailureAction(true));
          })
        )
      )
    );
  });

}
