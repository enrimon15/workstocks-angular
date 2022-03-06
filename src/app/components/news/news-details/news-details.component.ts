import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {INewsDetailstState, INewsLikeState, INewsState} from "../store/state/news.states";
import {selectNewsDetails, selectNewsLike} from "../store/selectors/news.selector";
import {map, Observable, Subscription} from "rxjs";
import {News} from "../../../model/News";
import {AddLikeAction, CheckLikeAction, RemoveLikeAction, ShowDetailsAction} from "../store/actions/news.actions";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit, OnDestroy {
  newsId!: string;
  newsState$!: Observable<INewsDetailstState>;
  likeState$!: Observable<INewsLikeState>;
  loading: boolean = false;
  news!: News;
  likesNumber: number = 0;
  newsSubscription!: Subscription;
  likeSubscription!: Subscription;
  isLikedByUser: boolean = false;
  error: boolean = false;

  constructor(private route: ActivatedRoute, private store: Store<INewsState>, public authService: AuthService) {
    this.loading = true;
    this.newsState$ = this.store.pipe(select(selectNewsDetails));
    this.likeState$ = this.store.pipe(select(selectNewsLike));
  }

  ngOnInit(): void {
    this.newsSubscription = this.newsState$.pipe(
      map(newsDetailsState => {
        this.news = newsDetailsState.news;
        this.likesNumber = newsDetailsState.news.likesNumber;
        this.loading = newsDetailsState.loading;
      })
    ).subscribe();

    this.likeSubscription = this.likeState$.pipe(
      map(likeState => {
        this.isLikedByUser = likeState.isLiked;
      })
    ).subscribe();

    this.route.paramMap.subscribe( paramMap => {
      this.newsId = paramMap.get('id') ?? '';
      this.getById();
      if (this.authService.isAuthenticated()) {
        this.checkLike();
      }
    });
  }

  private getById() {
    this.store.dispatch(new ShowDetailsAction(this.newsId));
  }

  private checkLike() {
    this.store.dispatch((new CheckLikeAction(this.newsId)));
  }

  sendLike() {
    if (this.isLikedByUser) {
      this.isLikedByUser = false;
      this.likesNumber -= 1;
      this.store.dispatch(new RemoveLikeAction(this.newsId));
    } else {
      this.isLikedByUser = true;
      this.likesNumber += 1;
      this.store.dispatch(new AddLikeAction(this.newsId));
    }
  }

  ngOnDestroy() {
    if (this.newsSubscription) {
      this.newsSubscription.unsubscribe();
    }

    if (this.likeSubscription) {
      this.likeSubscription.unsubscribe();
    }
  }

}
