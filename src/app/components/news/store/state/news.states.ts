import {News} from "../../../../model/News";
import {PaginatedResponse} from "../../../../model/PaginatedResponse";

export interface INewsState {
  newsListState: INewsListState;
  newsDetailsState: INewsDetailstState;
  newsLikeState: INewsLikeState;
}

// LIST

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

// DETAILS

export interface INewsDetailstState {
  news: News;
  error: boolean;
  loading: boolean;
}

export const initialNewsDetailsState: INewsDetailstState = {
  news: {
    id: '',
    title: '',
    body: '',
    likesNumber: 0,
    createdAt: undefined,
    photo: ''
  },
  error: false,
  loading: false
};

// LIKES

export interface INewsLikeState {
  isLiked: boolean;
  error: boolean;
  loading: boolean;
}

export const initialNewsLikeState: INewsLikeState = {
  isLiked: false,
  error: false,
  loading: false
};
