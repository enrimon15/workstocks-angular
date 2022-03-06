import { Component, OnInit } from '@angular/core';
import {JobOfferService} from "../../services/job-offer/job-offer.service";
import {JobOffer} from "../../model/JobOffer";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent implements OnInit {
  jobList: JobOffer[] = [];
  page: number= 1;
  pageSize: number = 10;
  count: number= 0;
  description: string = '';
  address: string = '';
  skill: string = '';
  company: string = '';
  contractType: string | null = null;
  salary: number | null = null;
  experience: number | null = null;
  loading: boolean = false;
  loadingNext: boolean = false;
  firstOpening: boolean = true;

  constructor(private jobService: JobOfferService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe( (params: Params) => {
      if (params['title']) this.description = params['title'];
      if (params['address']) this.address = params['address'];
      if (params['company']) this.company = params['company'];
      this.getJobList();
    });
  }

  private getJobList(): void {
    this.firstOpening ? this.loading = true : this.loadingNext = true;
    this.jobService.getAll(this.contractType, this.salary, this.experience, this.description, this.address, this.company, this.skill, this.page, this.pageSize)
      .subscribe(response => {
        this.jobList = response.elements;
        this.count = response.response.totalElements;
        this.page = response.response.pageNumber;
        this.firstOpening ? this.loading = false : this.loadingNext = false;
        this.firstOpening = false;
      });
  }

  searchJobList() {
    this.page = 1;
    this.getJobList();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getJobList();
  }

  onExperienceChange(newValue: number) {
    this.page = 1;
    this.experience = newValue;
    this.getJobList();
  }

  onSalaryChange(newValue: number) {
    this.page = 1;
    this.salary = newValue;
    this.getJobList();
  }

  onContractTypeChange(newValue: string) {
    this.page = 1;
    this.contractType = newValue;
    this.getJobList();
  }

  resetFilters(searchForm: NgForm) {
    this.page = 1;
    searchForm.resetForm();
    this.salary = null;
    this.experience = null;
    this.contractType = null;
    this.getJobList();
  }

}
