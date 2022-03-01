import {createSelector} from "@ngrx/store";
import {INewsDetailstState, INewsLikeState, INewsListState, INewsState} from "../state/news.states";

// LIST

const selectNewsListState = (state: INewsState) => {
  return state.newsListState;
};

export const selectNewsList  = createSelector(
  selectNewsListState,
  (state: INewsListState) => {
    return state;
  }
);

// NEWS

const selectNewsDetailsState = (state: INewsState) => {
  return state.newsDetailsState;
};

export const selectNewsDetails  = createSelector(
  selectNewsDetailsState,
  (state: INewsDetailstState) => {
    return state;
  }
);

// LIKE

const selectNewsLikeState = (state: INewsState) => {
  return state.newsLikeState;
};

export const selectNewsLike  = createSelector(
  selectNewsLikeState,
  (state: INewsLikeState) => {
    return state;
  }
);
