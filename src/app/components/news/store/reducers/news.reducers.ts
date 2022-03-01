import {
  INewsDetailstState, INewsLikeState,
  INewsListState,
  initialNewsDetailsState,
  initialNewsLikeState,
  initialNewsListState
} from "../state/news.states";
import * as fromActions from '../actions/news.actions';
import {ENewsActions} from "../actions/news.actions";

export function newsListReducer(state = initialNewsListState, action: fromActions.ALL_REDUCER_ACTIONS): INewsListState {
  switch (action.type) {
    case ENewsActions.SHOW_ALL: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case ENewsActions.SHOW_ALL_SUCCESS: {
      return {
        ...state,
        newsList: action.payload,
        loading: false,
        error: false
      };
    }

    default:
      return state;
  }
}

export function newsDetailsReducer(state = initialNewsDetailsState, action: fromActions.ALL_REDUCER_ACTIONS): INewsDetailstState {
  switch (action.type) {
    case ENewsActions.SHOW_DETAILS: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case ENewsActions.SHOW_DETAILS_SUCCESS: {
      return {
        ...state,
        news: action.payload,
        loading: false,
        error: false
      };
    }

    default:
      return state;
  }
}

export function newsLikeReducer(state = initialNewsLikeState, action: fromActions.ALL_REDUCER_ACTIONS): INewsLikeState {
  switch (action.type) {
    case ENewsActions.CHECK_LIKE: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case ENewsActions.CHECK_LIKE_SUCCESS: {
      return {
        ...state,
        isLiked: action.isLiked,
        loading: false,
        error: false
      };
    }
    case ENewsActions.ADD_LIKE: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case ENewsActions.REMOVE_LIKE: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case ENewsActions.HANDLE_LIKE_FAILURE: {
      return {
        ...state,
        isLiked: action.isLiked,
        loading: false,
        error: true
      };
    }

    default:
      return state;
  }
}
