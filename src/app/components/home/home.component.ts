import { Component, OnInit } from '@angular/core';
import {HomeService} from "../../services/home/home.service";
import {forkJoin} from "rxjs";
import {Company} from "../../model/Company";
import {JobOffer} from "../../model/JobOffer";
import { OwlOptions } from 'ngx-owl-carousel-o';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert/alert.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
        items: 3,
      },
      1000: {
        items: 3,
      }
    }
  }

  loading: boolean = false;
  mostRankedCompanies?: Company[];
  popularJobs?: JobOffer[];
  countApplicants: number = 0;
  countApplications: number = 0;
  countCompanies: number = 0;
  countJobOffers: number = 0;
  address: string = '';
  title: string = '';


  constructor(private homeService: HomeService, private router: Router, private alert: AlertService) { }

  ngOnInit(): void {
    this.loadData();
  }


  private loadData() {
    this.loading = true;

    forkJoin([
      this.homeService.getPopularCompanies(),
      this.homeService.getPopularJobOffers(),
      this.homeService.countApplicants(),
      this.homeService.countApplications(),
      this.homeService.countCompanies(),
      this.homeService.countJobOffers()
    ]).subscribe(([companies, jobs, applicantsNumber, applicationsNumber, companiesNumber, jobsNumber]) => {
        this.mostRankedCompanies = companies;
        this.popularJobs = jobs;
        this.countApplicants = applicantsNumber.count ?? 0;
        this.countApplications = applicationsNumber.count ?? 0;
        this.countCompanies = companiesNumber.count ?? 0;
        this.countJobOffers = jobsNumber.count ?? 0;

        this.loading = false;
    })
  }

  search(homeForm: NgForm) {
    if (homeForm.valid && homeForm.value != null) {
      let params = {address: this.address ?? null, title: this.title ?? null};
      this.router.navigate(['job-offers'], {queryParams: params});
    } else {
      this.alert.showError('error.error','');
    }
  }
}
