import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JobOffer} from "../../../model/JobOffer";
import {DashboardService} from "../../../services/dashboard/dashboard.service";
import {AuthService} from "../../../auth/auth.service";
import {AlertService} from "../../../services/alert/alert.service";

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  jobApplications: JobOffer[] = [];
  page: number= 1;
  pageSize: number = 10;
  count: number= 0;
  loading: boolean = false;
  loadingModal: boolean = false;
  loadingNext: boolean = false;
  firstOpening: boolean = true;
  applicationToDelete?: number;
  applicantId!: number;
  now: Date = new Date();

  @ViewChild('closeDeleteModal') closeDeleteModal!: ElementRef;

  constructor(private dashboardService: DashboardService, private authService: AuthService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.applicantId = this.authService.getUserLogged()?.id ?? 0;
    this.getApplicationsList();
  }

  private getApplicationsList() {
    this.firstOpening ? this.loading = true : this.loadingNext = true;
    this.dashboardService.getApplications(this.applicantId, this.page, this.pageSize)
      .subscribe(response => {
        this.jobApplications = response.elements;
        this.count = response.response.totalElements;
        this.page = response.response.pageNumber;
        this.firstOpening ? this.loading = false : this.loadingNext = false;
        this.firstOpening = false;
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getApplicationsList();
  }

  markApplicationToDelete(id: number) {
    this.applicationToDelete = id;
  }

  deleteApplication() {
    this.loadingModal = true;
    this.dashboardService.deleteApplication(this.applicantId, this.applicationToDelete ?? 0)
      .subscribe({
        next: (res) => {
          this.loadingModal = false;
          this.closeDeleteModal.nativeElement.click();
          this.alertService.showSuccess('dashboard.application.successDelete', '');

          this.getApplicationsList();
        },
        error: (error) => {
          this.loadingModal = false;
          this.alertService.showError('dashboard.application.errorDelete', '');
        }
      })
  }


}
