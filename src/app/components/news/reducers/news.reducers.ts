import {INewsListState, initialNewsListState} from "../state/news.states";
import * as fromActions from '../actions/news.actions';
import {ENewsActions} from "../actions/news.actions";

export function newsListReducer(state = initialNewsListState, action: fromActions.ALL_REDUCER_ACTIONS): INewsListState {
  switch (action.type) {
    case ENewsActions.SHOW_ALL: {
      return {
        ...state,
        loading: true
      };
    }
    case ENewsActions.SHOW_ALL_SUCCESS: {
      return {
        ...state,
        newsList: action.payload,
        loading: false
      };
    }

    default:
      return state;
  }
}
