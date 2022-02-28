import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Skill} from "../../../model/Skill";
import {Experience} from "../../../model/Experience";
import {Certification} from "../../../model/Certification";
import {Qualification} from "../../../model/Qualification";
import {DashboardService} from "../../../services/dashboard/dashboard.service";
import {AuthService} from "../../../auth/auth.service";
import {AlertService} from "../../../services/alert/alert.service";

@Component({
  selector: 'app-edit-cv',
  templateUrl: './edit-cv.component.html',
  styleUrls: ['./edit-cv.component.css']
})
export class EditCvComponent implements OnInit {
  applicantId!: number;
  id!: number;
  type!: string;
  skill?: Skill;
  experience?: Experience;
  certification?: Certification;
  qualification?: Qualification;
  loading: boolean = false;
  loadingSpinner: boolean = false;

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService, private authService: AuthService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.applicantId = this.authService.getUserLogged()?.id ?? 0;

    this.route.paramMap.subscribe( paramMap => {
      this.id = Number(paramMap.get('id'));
      this.type = paramMap.get('type') ?? '';

      switch (this.type) {
        case 'skill':
          this.getSkillById(this.id);
          break;
        case 'experience':
          this.getExperienceById(this.id);
          break;
        case 'certification':
          this.getCertificationById(this.id);
          break;
        case 'qualification':
          this.getQualificationById(this.id);
          break;
        default:
          this.alertService.showError('error.error', '');
      }

    });
  }

  updateSkill(skill: Skill) {
    this.loadingSpinner = true;
    this.dashboardService.updateSkill(this.applicantId, this.id, skill).subscribe( {
      next: res => {
        this.loadingSpinner = false;
        this.alertService.showSuccess('dashboard.onlineCV.updateSkill', '');
      },
      error: error => {
        this.loadingSpinner = false;
        this.alertService.showError('error.error', '');
      }
    });
  }

  updateCertification(certification: Certification) {
    this.loadingSpinner = true;
    this.dashboardService.updateCertification(this.applicantId, this.id, certification).subscribe( {
      next: res => {
        this.loadingSpinner = false;
        this.alertService.showSuccess('dashboard.onlineCV.updateCertificate', '');
      },
      error: error => {
        this.loadingSpinner = false;
        this.alertService.showError('error.error', '');
      }
    });
  }

  updateQualification(qualification: Qualification) {
    this.loadingSpinner = true;
    this.dashboardService.updateQualification(this.applicantId, this.id, qualification).subscribe( {
      next: res => {
        this.loadingSpinner = false;
        this.alertService.showSuccess('dashboard.onlineCV.updateQualification', '');
      },
      error: error => {
        this.loadingSpinner = false;
        this.alertService.showError('error.error', '');
      }
    });
  }

  updateExperience(experience: Experience) {
    this.loadingSpinner = true;
    this.dashboardService.updateExperience(this.applicantId, this.id, experience).subscribe( {
      next: res => {
        this.loadingSpinner = false;
        this.alertService.showSuccess('dashboard.onlineCV.updateExperience', '');
      },
      error: error => {
        this.loadingSpinner = false;
        this.alertService.showError('error.error', '');
      }
    });
  }

  getSkillById(id: number) {
    this.loading = true;
    this.dashboardService.getSkill(this.applicantId, id).subscribe(res => {
      this.skill = res;
      this.loading = false;
    });
  }

  getExperienceById(id: number) {
    this.loading = true;
    this.dashboardService.getExperience(this.applicantId, id).subscribe(res => {
      this.experience = res;
      this.loading = false;
    });
  }

  getCertificationById(id: number) {
    this.loading = true;
    this.dashboardService.getCertification(this.applicantId, id).subscribe(res => {
      this.certification = res;
      this.loading = false;
    });
  }

  getQualificationById(id: number) {
    this.loading = true;
    this.dashboardService.getQualification(this.applicantId, id).subscribe(res => {
      this.qualification = res;
      this.loading = false;
    });
  }


}
