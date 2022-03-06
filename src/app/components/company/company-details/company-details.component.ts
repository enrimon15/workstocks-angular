import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CompanyService} from "../../../services/company/company.service";
import {AuthService} from "../../../auth/auth.service";
import {EmailService} from "../../../services/email/email.service";
import {EmailRequest} from "../../../model/EmailRequest";
import {forkJoin} from "rxjs";
import {Review} from "../../../model/review";
import {Check} from "../../../model/Check";
import {Company} from "../../../model/Company";
import {AlertService} from "../../../services/alert/alert.service";
import {AppConstants} from "../../../app.constants";
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  companyId: number = 0;
  loading: boolean = false;
  company?: Company;
  isJobAlert: Check = {result: false};
  loadingSpinner: boolean = false;
  email: EmailRequest;
  review: Review;

  @ViewChild('closeMailModal') closeMailModal!: ElementRef;

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    center: true,
    dots: false,
    autoHeight: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 2,
      }
    }
  }

  constructor(private route: ActivatedRoute, private companyService: CompanyService, public authService: AuthService,
              private mailService: EmailService, private alertService: AlertService) {
    this.email = {to: '', subject: '', messageBody: ''};
    this.review = {rating: 0};
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.companyId = Number(paramMap.get('id'));
      this.getById();
    })
  }

  getById() {
    this.loading = true;

    if (this.authService.isAuthenticated()) {
      forkJoin([
        this.companyService.getById(this.companyId),
        this.companyService.checkJobAlert(this.companyId, this.authService.getUserLogged()?.id ?? null),
        this.companyService.getReviewByLoggedApplicant(this.companyId),
      ]).subscribe(([company, isJobAlert, review]) => {
        this.company = company;
        this.isJobAlert = isJobAlert;
        this.review.rating = review.rating;

        this.loading = false;
      })
    } else {
      this.companyService.getById(this.companyId).subscribe(res => {
        this.company = res;
        this.loading = false;
      });
    }

  }

  handleMail() {
    this.loadingSpinner = true;

    this.email.to = this.authService.getUserLogged()?.email ?? '';
    this.email.subject = AppConstants.REQUEST_CONTACT;

    this.mailService.sendEmail(this.email).subscribe({
      next: (res) => {
        this.loadingSpinner = false;
        this.alertService.showSuccess('profile.mailSuccess', '');
        this.email.messageBody = '';
        this.closeMailModal.nativeElement.click();
      },
      error: (error) => {
        this.loadingSpinner = false;
        this.alertService.showError('profile.mailError', '');
      }
    });
  }

  sendReview() {
    this.loadingSpinner = true;

    this.companyService.setReviewByLoggedApplicant(this.companyId, this.review).subscribe({
      next: (res) => {
        this.updateGUIReview();
      },
      error: (error) => {
        this.loadingSpinner = false;
        this.alertService.showError('profile.reviewError', '');
      }
    });
  }

  private updateGUIReview() {
    this.companyService.getById(this.companyId).subscribe(res => {
      // @ts-ignore
      this.company?.ratingStats = res.ratingStats;
      this.loadingSpinner = false;
      this.alertService.showSuccess('profile.reviewSuccess', '');
    })
  }

  handleJobAlert() {
    const oldJobAlert = this.isJobAlert.result;

    if (this.isJobAlert?.result) {
      this.companyService.removeJobAlert(this.companyId, this.authService.getUserLogged()?.id ?? 0).subscribe({
        error: (error) => {
          this.isJobAlert.result = oldJobAlert;
          this.alertService.showError('profile.jobAlertError', '');
        }
      });
    } else {
      this.companyService.addJobAlert(this.companyId, this.authService.getUserLogged()?.id ?? 0).subscribe({
        error: (error) => {
          this.isJobAlert.result = oldJobAlert;
          this.alertService.showError('profile.jobAlertError', '');
        }
      });
    }

    this.isJobAlert.result = !oldJobAlert;

  }

}
