import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApplicantService} from "../../../services/applicant/applicant.service";
import {forkJoin} from "rxjs";
import {User} from "../../../model/User";
import {Skill} from "../../../model/Skill";
import {Experience} from "../../../model/Experience";
import {Qualification} from "../../../model/Qualification";
import {Certification} from "../../../model/Certification";

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.css']
})
export class ApplicantDetailsComponent implements OnInit {
  applicantId: number = 0;
  loading: boolean = false;
  user?: User;
  skills: Skill[] = [];
  experiences: Experience[] = [];
  qualifications: Qualification[] = [];
  certifications: Certification[] = [];


  constructor(private route: ActivatedRoute, private applicantService: ApplicantService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.applicantId = Number(paramMap.get('id'));
      this.getById();
    })
  }

  getById() {
    this.loading = true;

    forkJoin([
      this.applicantService.getById(this.applicantId),
      this.applicantService.getSkills(this.applicantId),
      this.applicantService.getCertifications(this.applicantId),
      this.applicantService.getQualifications(this.applicantId),
      this.applicantService.getExperiences(this.applicantId),
    ]).subscribe(([user, skills, certifications, qualifications, experiences]) => {
      this.user = user;
      this.skills = skills;
      this.certifications = certifications;
      this.qualifications = qualifications;
      this.experiences = experiences;

      this.loading = false;
    })
  }

}
