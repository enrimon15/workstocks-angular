import { Component, OnInit } from '@angular/core';
import {JobOffer} from "../../../model/JobOffer";
import {DashboardService} from "../../../services/dashboard/dashboard.service";
import {AuthService} from "../../../auth/auth.service";
import {AlertService} from "../../../services/alert/alert.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: JobOffer[] = [];
  page: number= 1;
  pageSize: number = 10;
  count: number= 0;
  loading: boolean = false;
  loadingModal: boolean = false;
  loadingNext: boolean = false;
  firstOpening: boolean = true;
  favoriteToDelete?: number;
  applicantId!: number;
  now: Date = new Date();

  constructor(private dashboardService: DashboardService, private authService: AuthService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.applicantId = this.authService.getUserLogged()?.id ?? 0;
    this.getFavorites();
  }

  private getFavorites() {
    this.firstOpening ? this.loading = true : this.loadingNext = true;
    this.dashboardService.getFavorites(this.applicantId, this.page, this.pageSize)
      .subscribe(response => {
        this.favorites = response.elements;
        this.count = response.response.totalElements;
        this.page = response.response.pageNumber;
        this.firstOpening ? this.loading = false : this.loadingNext = false;
        this.firstOpening = false;
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getFavorites();
  }

  markFavoriteToDelete(id: number) {
    this.favoriteToDelete = id;
  }

  deleteFavorite() {
    this.loadingModal = true;
    this.dashboardService.deleteFavorite(this.applicantId, this.favoriteToDelete ?? 0)
      .subscribe({
        next: (res) => {
          this.loadingModal = false;
          this.alertService.showSuccess('dashboard.favorite.successDelete', '');
        },
        error: (error) => {
          this.loadingModal = false;
          this.alertService.showError('dashboard.favorite.errorDelete', '');
        }
      })
  }

}
