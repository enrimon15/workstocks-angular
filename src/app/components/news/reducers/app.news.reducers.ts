import {ActionReducerMap} from "@ngrx/store";
import { newsListReducer } from './news.reducers';
import {INewsState} from "../state/news.states";

export const appNewsReducers: ActionReducerMap<INewsState, any> = {
  newsListState: newsListReducer
};
