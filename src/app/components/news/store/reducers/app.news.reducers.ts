import {ActionReducerMap} from "@ngrx/store";
import {newsDetailsReducer, newsLikeReducer, newsListReducer} from './news.reducers';
import {INewsState} from "../state/news.states";

export const appNewsReducers: ActionReducerMap<INewsState, any> = {
  newsListState: newsListReducer,
  newsDetailsState: newsDetailsReducer,
  newsLikeState: newsLikeReducer,
};
