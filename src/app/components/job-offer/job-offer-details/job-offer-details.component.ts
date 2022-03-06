import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";
import {EmailService} from "../../../services/email/email.service";
import {AlertService} from "../../../services/alert/alert.service";
import {JobOfferService} from "../../../services/job-offer/job-offer.service";
import {Check} from "../../../model/Check";
import {JobOffer} from "../../../model/JobOffer";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-job-offer-details',
  templateUrl: './job-offer-details.component.html',
  styleUrls: ['./job-offer-details.component.css']
})
export class JobOfferDetailsComponent implements OnInit {
  jobOfferId: number = 0;
  loading: boolean = false;
  jobOffer?: JobOffer;
  isApplicated: Check = {result: false};
  isFavorite: Check = {result: false};
  loadingSpinner: boolean = false;

  @ViewChild('closeApplyModal') closeApplyModal!: ElementRef;

  constructor(private route: ActivatedRoute, public authService: AuthService, private mailService: EmailService,
              private alertService: AlertService, private jobService: JobOfferService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.jobOfferId = Number(paramMap.get('id'));
      this.getById();
    })
  }

  getById() {
    this.loading = true;

    if (this.authService.isAuthenticated()) {
      forkJoin([
        this.jobService.getById(this.jobOfferId),
        this.jobService.checkFavorite(this.jobOfferId, this.authService.getUserLogged()?.id ?? null),
        this.jobService.checkApplication(this.jobOfferId, this.authService.getUserLogged()?.id ?? null),
      ]).subscribe(([jobOffer, isFavorite, isApplicated]) => {
        this.jobOffer = jobOffer;
        this.isFavorite = isFavorite;
        this.isApplicated = isApplicated;

        this.loading = false;
      })
    } else {
      this.jobService.getById(this.jobOfferId).subscribe(res => {
        console.log(res);
        this.jobOffer = res;
        this.loading = false;
      });
    }

  }

  sendApplication() {
    this.loadingSpinner = true;

    this.jobService.addApplication(this.jobOfferId, this.authService.getUserLogged()?.id ?? null).subscribe({
      next: (res) => {
        this.loadingSpinner = false;
        this.alertService.showSuccess('job.alreadyApplied', '');
        this.closeApplyModal.nativeElement.click();
        this.isApplicated.result = true;
      },
      error: (error) => {
        this.loadingSpinner = false;
        this.alertService.showError('job.applyError', '');
      }
    });
  }

  handleFavorite() {
    const oldFavorite = this.isFavorite.result;

    if (this.isFavorite?.result) {
      this.jobService.removeFavorite(this.jobOfferId, this.authService.getUserLogged()?.id ?? 0).subscribe({
        error: (error) => {
          this.isFavorite.result = oldFavorite;
          this.alertService.showError('job.errorFavorite', '');
        }
      });
    } else {
      this.jobService.addFavorite(this.jobOfferId, this.authService.getUserLogged()?.id ?? 0).subscribe({
        error: (error) => {
          this.isFavorite.result = oldFavorite;
          this.alertService.showError('job.errorFavorite', '');
        }
      });
    }

    this.isFavorite.result = !oldFavorite;

  }

}
