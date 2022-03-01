import {News} from "../../../model/News";
import {PaginatedResponse} from "../../../model/PaginatedResponse";

export interface INewsState {
  newsListState: INewsListState;
}

export interface INewsListState {
  newsList: PaginatedResponse<News>;
  error: boolean;
  loading: boolean;
}

export const initialNewsListState: INewsListState = {
  newsList: {
    elements: [],
    response: {
      pageSize: 0,
      pageNumber: 0,
      totalPages: 0,
      totalElements: 0,
    }
  },
  error: false,
  loading: false
};
