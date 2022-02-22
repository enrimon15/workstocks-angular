import { Component, OnInit } from '@angular/core';
import {User} from "../../model/User";
import {ApplicantService} from "../../services/applicant/applicant.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant-search.component.html',
  styleUrls: ['./applicant-search.component.css']
})
export class ApplicantSearchComponent implements OnInit {
  applicantList: User[] = [];
  page: number= 1;
  pageSize: number = 10;
  count: number= 0;
  name: string = '';
  address: string = '';
  jobTitle: string = '';
  skill: string = '';
  salary: number | null = null;
  loading: boolean = false;
  loadingNext: boolean = false;
  firstOpening: boolean = true;

  constructor(private applicantService: ApplicantService) { }

  ngOnInit(): void {
    this.getApplicantList();
  }

  getApplicantList(): void {
    this.firstOpening ? this.loading = true : this.loadingNext = true;
    this.applicantService.getAll(this.salary, this.name, this.skill, this.jobTitle, this.address, this.page, this.pageSize)
      .subscribe(response => {
        this.applicantList = response.elements;
        this.count = response.response.totalElements;
        this.page = response.response.pageNumber;
        this.firstOpening ? this.loading = false : this.loadingNext = false;
        this.firstOpening = false;
    });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getApplicantList();
  }

  onSalaryChange(newValue: number) {
    this.salary = newValue;
    this.getApplicantList();
  }

  resetFilters(searchForm: NgForm) {
    searchForm.resetForm();
    this.salary = null;
    this.getApplicantList();
  }

}
