import {createSelector} from "@ngrx/store";
import {INewsListState, INewsState} from "../state/news.states";

const selectNewsListState = (state: INewsState) => {
  return state.newsListState;
};

export const selectNewsList  = createSelector(
  selectNewsListState,
  (state: INewsListState) => {
    return state;
  }
);
