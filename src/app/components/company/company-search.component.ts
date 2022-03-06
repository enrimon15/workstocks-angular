import { Component, OnInit } from '@angular/core';
import {CompanyService} from "../../services/company/company.service";
import {NgForm} from "@angular/forms";
import {Company} from "../../model/Company";

@Component({
  selector: 'app-company',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css']
})
export class CompanySearchComponent implements OnInit {
  companyList: Company[] = [];
  page: number= 1;
  pageSize: number = 10;
  count: number= 0;
  name: string = '';
  address: string = '';
  employeesNumber: number | null = null;
  foundationYear: number | null = null;
  loading: boolean = false;
  loadingNext: boolean = false;
  firstOpening: boolean = true;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getCompanyList();
  }

  private getCompanyList(): void {
    this.firstOpening ? this.loading = true : this.loadingNext = true;
    this.companyService.getAll(this.foundationYear, this.employeesNumber, this.name, this.address, this.page, this.pageSize)
      .subscribe(response => {
        this.companyList = response.elements;
        this.count = response.response.totalElements;
        this.page = response.response.pageNumber;
        this.firstOpening ? this.loading = false : this.loadingNext = false;
        this.firstOpening = false;
      });
  }

  searchCompanyList() {
    this.page = 1;
    this.getCompanyList();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getCompanyList();
  }

  onFoundationYearChange(newValue: number) {
    this.page = 1;
    this.foundationYear = newValue;
    this.getCompanyList();
  }

  onEmployeesNumberChange(newValue: number) {
    this.page = 1;
    this.employeesNumber = newValue;
    this.getCompanyList();
  }

  resetFilters(searchForm: NgForm) {
    this.page = 1;
    searchForm.resetForm();
    this.employeesNumber = null;
    this.foundationYear = null;
    this.getCompanyList();
  }

}
