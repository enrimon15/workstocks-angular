import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {INewsListState, INewsState} from "./state/news.states";
import {News} from "../../model/News";
import {selectNewsList} from "./selectors/news.selector";
import {map, Observable, Subscription} from "rxjs";
import {PaginatedResponse} from "../../model/PaginatedResponse";
import {ShowAllAction} from "./actions/news.actions";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit,OnDestroy {
  newsListState$: Observable<INewsListState>;
  newsList!: PaginatedResponse<News>;
  page: number= 1;
  pageSize: number = 9;
  count: number= 0;
  loading: boolean = false;
  title?: string = '';
  newsSubscription!: Subscription;

  constructor(private store: Store<INewsState>) {
    this.loading = true;
    this.newsListState$ = this.store.pipe(select(selectNewsList));
  }

  ngOnInit(): void {
    this.newsSubscription = this.newsListState$.pipe(
      map(newsListState => {
        this.newsList = newsListState.newsList;
        this.loading = newsListState.loading;
      })
    ).subscribe();

    this.getAllNews();
  }

  getAllNews() {
    this.store.dispatch(new ShowAllAction(this.page, this.pageSize, this.title));
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getAllNews();
  }

  ngOnDestroy() {
    if (this.newsSubscription) {
      this.newsSubscription.unsubscribe();
    }
  }

}
