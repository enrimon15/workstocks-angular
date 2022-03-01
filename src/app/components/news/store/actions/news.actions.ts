import { Action } from '@ngrx/store';
import {News} from "../../../../model/News";
import {PaginatedResponse} from "../../../../model/PaginatedResponse";

export enum ENewsActions {
  SHOW_ALL = '[News] Show All',
  SHOW_ALL_SUCCESS = '[News] Show All Success',
  SHOW_DETAILS = '[News] Show Details',
  SHOW_DETAILS_SUCCESS = '[News] Show Details Success',
  CHECK_LIKE = '[News] Check User Like',
  CHECK_LIKE_SUCCESS = '[News] Check User Like Success',
  ADD_LIKE = '[News] Check Add Like',
  REMOVE_LIKE = '[News] Check Remove Like',
  HANDLE_LIKE_FAILURE = '[News] Handle User Like Success'
}

// LIST

export class ShowAllAction implements Action {
  readonly type = ENewsActions.SHOW_ALL;
  constructor(public page: number, public pageSize: number, public title?: string) {}
}

export class ShowAllSuccessAction implements Action {
  readonly type = ENewsActions.SHOW_ALL_SUCCESS;
  constructor(public payload: PaginatedResponse<News>) {}
}

// DETAILS

export class ShowDetailsAction implements Action {
  readonly type = ENewsActions.SHOW_DETAILS;
  constructor(public id: string) {}
}

export class ShowDetailsSuccessAction implements Action {
  readonly type = ENewsActions.SHOW_DETAILS_SUCCESS;
  constructor(public payload: News) {}
}

// LIKE

export class CheckLikeAction implements Action {
  readonly type = ENewsActions.CHECK_LIKE;
  constructor(public newsId: string) {}
}

export class LikeSuccessAction implements Action {
  readonly type = ENewsActions.CHECK_LIKE_SUCCESS;
  constructor(public isLiked: boolean) {}
}

export class AddLikeAction implements Action {
  readonly type = ENewsActions.ADD_LIKE;
  constructor(public newsId: string) {}
}

export class RemoveLikeAction implements Action {
  readonly type = ENewsActions.REMOVE_LIKE;
  constructor(public newsId: string) {}
}

export class HandleLikeFailureAction implements Action {
  readonly type = ENewsActions.HANDLE_LIKE_FAILURE;
  constructor(public isLiked: boolean) {}
}

export type ALL_REDUCER_ACTIONS = ShowAllAction | ShowAllSuccessAction | ShowDetailsAction | ShowDetailsSuccessAction
  | CheckLikeAction | LikeSuccessAction | AddLikeAction | RemoveLikeAction | HandleLikeFailureAction;
