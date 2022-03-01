import { Action } from '@ngrx/store';
import {News} from "../../../model/News";
import {PaginatedResponse} from "../../../model/PaginatedResponse";

export enum ENewsActions {
  SHOW_ALL = '[News] Show All',
  SHOW_ALL_SUCCESS = '[News] Show All Success',
  SHOW_DETAILS = '[News] Show Details',
  SHOW_DETAILS_SUCCESS = '[News] Show Details Success',
  LIKE = '[News] Handle Like',
  LIKE_SUCCESS = '[News] Handle Like Success',
  LIKE_FAILURE = '[News] Handle Like Failure',
  CREATE_COMMENT = '[News] Create Comment',
  CREATE_COMMENT_SUCCESS = '[News] Create Comment Success',
  CREATE_COMMENT_FAILURE = '[News] Create Comment Failure'
}

export class ShowAllAction implements Action {
  readonly type = ENewsActions.SHOW_ALL;
  constructor(public page: number, public pageSize: number, public title?: string) {}
}

export class ShowAllSuccessAction implements Action {
  readonly type = ENewsActions.SHOW_ALL_SUCCESS;
  constructor(public payload: PaginatedResponse<News>) {}
}

/*export class ShowAllFailureAction implements Action {
  readonly type = ENewsActions.SHOW_ALL_SUCCESS;
  constructor(public payload: PaginatedResponse<News>) {}
}*/

/*export class CreateAction implements Action {
  readonly type = EMovieActions.CREATE;
  constructor(public payload: Movie) {}
}
export class CreateSuccessAction implements Action {
  readonly type = EMovieActions.CREATE_SUCCESS;
  constructor(public payload: Movie) {}
}
export class CreateFailureAction implements Action {
  readonly type = EMovieActions.CREATE_FAILURE;
  constructor(public payload: any) {}
}*/

export type ALL_REDUCER_ACTIONS = ShowAllAction | ShowAllSuccessAction;
