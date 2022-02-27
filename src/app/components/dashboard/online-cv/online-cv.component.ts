import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {DashboardService} from "../../../services/dashboard/dashboard.service";
import {ApplicantService} from "../../../services/applicant/applicant.service";
import {AlertService} from "../../../services/alert/alert.service";
import {Skill} from "../../../model/Skill";
import {Experience} from "../../../model/Experience";
import {Qualification} from "../../../model/Qualification";
import {Certification} from "../../../model/Certification";
import {forkJoin} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CVFile} from "../../../model/CVFile";
import * as FileSaver from "file-saver";

type FormObjectBoolean = {
  [key: string]: boolean;
}

@Component({
  selector: 'app-online-cv',
  templateUrl: './online-cv.component.html',
  styleUrls: ['./online-cv.component.css']
})
export class OnlineCvComponent implements OnInit {
  applicantId!: number;
  loading: boolean = false;
  loadingModal: boolean = false;
  loadingSkill: boolean = false;
  loadingExperience: boolean = false;
  loadingQualification: boolean = false;
  loadingCertification: boolean = false;
  loadingCV: boolean = false;
  isCv: boolean = false;
  cv!: CVFile;
  skillList: Skill[] = [];
  experienceList: Experience[] = [];
  qualificationList: Qualification[] = [];
  certificationList: Certification[] = [];
  skillToRemove!: number;
  experienceToRemove!: number;
  certificationToRemove!: number;
  qualificationToRemove!: number;
  skillForm!: FormGroup;
  qualificationForm!: FormGroup;
  experienceForm!: FormGroup;
  certificationForm!: FormGroup;
  description!: string;
  inProgress: FormObjectBoolean = {experience: false, certification: false, qualification: false};
  formOpen: FormObjectBoolean = {skill: false, experience: false, certification: false, qualification: false};

  constructor(private fb: FormBuilder, public authService: AuthService, private dashboardService: DashboardService, private applicantService: ApplicantService, private alertService: AlertService) {
    this.skillForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      assestment: [null, [Validators.required, Validators.pattern('^(BEGINNER|INTERMEDIATE|ADVANCED)$')]]
    });

    this.experienceForm = this.fb.group({
      jobPosition: [null, [Validators.required, Validators.minLength(3)]],
      startDate: [null, [Validators.required]],
      endDate: [null],
      description: [null, [Validators.minLength(3)]],
      valuation: [null],
      institute: [null, [Validators.required, Validators.minLength(3)]],
      inProgress: [false],
    });

    this.qualificationForm = this.fb.group({
      jobPosition: [null, [Validators.required, Validators.minLength(3)]],
      startDate: [null, [Validators.required]],
      endDate: [null],
      description: [null, [Validators.minLength(3)]],
      company: [null, [Validators.required, Validators.minLength(3)]],
      inProgress: [false],
    });

    this.certificationForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      date: [null, [Validators.required]],
      endDate: [null],
      url: [null, [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      credential: [null, [Validators.required, Validators.minLength(5)]],
      company: [null, [Validators.required, Validators.minLength(3)]],
      noExpiration: [false],
    });
  }

  ngOnInit(): void {
    this.applicantId = this.authService.getUserLogged()?.id ?? 0;

    this.loading = true;

    forkJoin([
      this.applicantService.getById(this.applicantId),
      this.applicantService.getSkills(this.applicantId),
      this.applicantService.getCertifications(this.applicantId),
      this.applicantService.getQualifications(this.applicantId),
      this.applicantService.getExperiences(this.applicantId),
    ]).subscribe(([cv, skills, certifications, qualifications, experiences]) => {
      this.isCv = cv.cv ?? false;
      this.skillList = skills;
      this.certificationList = certifications;
      this.qualificationList = qualifications;
      this.experienceList = experiences;

      this.loading = false;
    })
  }

  addSkill() {
    this.loadingSkill = true;
    this.dashboardService.addSkill(this.applicantId, this.skillForm.value).subscribe( {
      next: res => {
        this.alertService.showSuccess('dashboard.onlineCV.successSkill', '');
        this.getSkills();
      },
      error: error => {
        this.loadingModal = false;
        this.alertService.showSuccess('error.error', '');
      }
    });
  }

  addCertification() {
    this.loadingCertification = true;
    this.dashboardService.addCertification(this.applicantId, this.certificationForm.value).subscribe( {
      next: res => {
        this.alertService.showSuccess('dashboard.onlineCV.successCertificate', '');
        this.getSkills();
      },
      error: error => {
        this.loadingModal = false;
        this.alertService.showSuccess('error.error', '');
      }
    });
  }

  addQualification() {
    this.loadingQualification = true;
    this.dashboardService.addQualification(this.applicantId, this.qualificationForm.value).subscribe( {
      next: res => {
        this.alertService.showSuccess('dashboard.onlineCV.successQualification', '');
        this.getSkills();
      },
      error: error => {
        this.loadingModal = false;
        this.alertService.showSuccess('error.error', '');
      }
    });
  }

  addExperience() {
    this.loadingExperience = true;
    this.dashboardService.addExperience(this.applicantId, this.experienceForm.value).subscribe( {
      next: res => {
        this.alertService.showSuccess('dashboard.onlineCV.successExperience', '');
        this.getSkills();
      },
      error: error => {
        this.loadingModal = false;
        this.alertService.showSuccess('error.error', '');
      }
    });
  }

  removeSkill() {
    this.loadingModal = true;
    this.dashboardService.removeSkill(this.applicantId, this.skillToRemove).subscribe( {
      next: res => {
        this.alertService.showSuccess('dashboard.onlineCV.deleteSkill', '');
        this.getSkills();
      },
      error: error => {
        this.loadingModal = false;
        this.alertService.showSuccess('error.error', '');
      }
    });
  }

  removeExperience() {
    this.loadingModal = true;
    this.dashboardService.removeExperience(this.applicantId, this.experienceToRemove).subscribe( {
      next: res => {
        this.alertService.showSuccess('dashboard.onlineCV.deleteExperience', '');
        this.getExperiences();
      },
      error: error => {
        this.loadingModal = false;
        this.alertService.showSuccess('error.error', '');
      }
    });
  }

  removeCertification() {
    this.loadingModal = true;
    this.dashboardService.removeCertification(this.applicantId, this.certificationToRemove).subscribe( {
      next: res => {
        this.alertService.showSuccess('dashboard.onlineCV.deleteCertificate', '');
        this.getCertifications();
      },
      error: error => {
        this.loadingModal = false;
        this.alertService.showSuccess('error.error', '');
      }
    });
  }

  removeQualification() {
    this.loadingModal = true;
    this.dashboardService.removeQualification(this.applicantId, this.qualificationToRemove).subscribe( {
      next: res => {
        this.alertService.showSuccess('dashboard.onlineCV.successQualification', '');
        this.getQualifications();
      },
      error: error => {
        this.loadingModal = false;
        this.alertService.showSuccess('error.error', '');
      }
    });
  }

  markRemoveOnlineCv(type: string, id: number) {
    switch (type) {
      case 'SKILL':
        this.skillToRemove = id;
        break;
      case 'EXPERIENCE':
        this.experienceToRemove = id;
        break;
      case 'CERTIFICATION':
        this.certificationToRemove = id;
        break;
      case 'QUALIFICATION':
        this.qualificationToRemove = id;
        break;
      default:
        this.alertService.showError('error.error', '');
    }
  }

  markDescription(description: string) {
    this.description = description;
  }

  changeInProgress(type: string) {
    switch (type) {
      case 'EXPERIENCE':
        this.inProgress['experience'] = !this.inProgress['experience'];
        break;
      case 'CERTIFICATION':
        this.inProgress['certification'] = !this.inProgress['certification'];
        break;
      case 'QUALIFICATION':
        this.inProgress['qualification'] = !this.inProgress['qualification'];
        break;
      default:
        this.alertService.showError('error.error', '');
    }
  }

  openForm(type: string) {
    switch (type) {
      case 'SKILL':
        this.formOpen['skill'] = !this.formOpen['skill'];
        break;
      case 'EXPERIENCE':
        this.formOpen['experience'] = !this.formOpen['experience'];
        break;
      case 'CERTIFICATION':
        this.formOpen['certification'] = !this.formOpen['certification'];
        break;
      case 'QUALIFICATION':
        this.formOpen['qualification'] = !this.formOpen['qualification'];
        break;
      default:
        this.alertService.showError('error.error', '');
    }
  }

  downloadCurriculum() {
    this.loadingCV = true;

    this.applicantService.downloadCv(this.applicantId).subscribe({
      next: (res) => {
        const cvName = `CV_${this.authService.getUserLogged()?.name}_${this.authService.getUserLogged()?.surname}_${this.applicantId}.pdf`
        FileSaver.saveAs(res, cvName)
        this.loadingCV = false;
      },
      error: (error) => {
        this.loadingCV = false;
        this.alertService.showError('profile.cvError', '');
      }
    });
  }

  processCV(cvInput: any) {
    const file: File = cvInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.cv.autogenerate = false;
      this.cv.curriculum = event.target.result; //btoa(event.target.result);
    });

    reader.readAsDataURL(file);
  }

  loadCV(autogenerate: boolean) {
    this.loadingCV = true;

    if (autogenerate) {
      this.cv.curriculum = undefined;
      this.cv.autogenerate = true;
    }

    this.dashboardService.loadCv(this.applicantId, this.cv).subscribe({
      next: (res) => {
        this.loadingCV = false;
        this.alertService.showError('dashboard.onlineCV.successCv', '');
      },
      error: (error) => {
        this.loadingCV = false;
        this.alertService.showError('error.error', '');
      }
    });
  }

  private getSkills() {
    this.applicantService.getSkills(this.applicantId).subscribe(res => {
      this.skillList = res;
      this.loadingSkill = false;
      this.loadingModal = false;
    });
  }

  private getExperiences() {
    this.applicantService.getExperiences(this.applicantId).subscribe(res => {
      this.experienceList = res;
      this.loadingExperience = false;
      this.loadingModal = false;
    });
  }

  private getCertifications() {
    this.applicantService.getCertifications(this.applicantId).subscribe(res => {
      this.certificationList = res;
      this.loadingCertification = false;
      this.loadingModal = false;
    });
  }

  private getQualifications() {
    this.applicantService.getQualifications(this.applicantId).subscribe(res => {
      this.qualificationList = res;
      this.loadingQualification = false;
      this.loadingModal = false;
    });
  }

}
