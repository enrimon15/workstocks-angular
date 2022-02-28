import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {DashboardService} from "../../../services/dashboard/dashboard.service";
import {ApplicantService} from "../../../services/applicant/applicant.service";
import {AlertService} from "../../../services/alert/alert.service";
import {Skill} from "../../../model/Skill";
import {Experience} from "../../../model/Experience";
import {Qualification} from "../../../model/Qualification";
import {Certification} from "../../../model/Certification";
import {forkJoin} from "rxjs";
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
  description!: string;
  formOpen: FormObjectBoolean = {skill: false, experience: false, certification: false, qualification: false};
  dtOptions: DataTables.Settings = {};

  @ViewChild('closeSkillModal') closeSkillModal!: ElementRef;
  @ViewChild('closeQualificationModal') closeQualificationModal!: ElementRef;
  @ViewChild('closeCertificationModal') closeCertificationModal!: ElementRef;
  @ViewChild('closeExperienceModal') closeExperienceModal!: ElementRef;

  constructor(public authService: AuthService, private dashboardService: DashboardService, private applicantService: ApplicantService, private alertService: AlertService) {
    this.dtOptions = {
      scrollX: true,
      scrollY: '280px',
      scrollCollapse: true,
      ordering: false,
      autoWidth: false,
      info: false,
      lengthChange: false,
      paging: false,
      language: {
        emptyTable: "No Data",
        search: "",
      }
    };
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

  addSkill(skill: Skill) {
    this.loadingSkill = true;
    this.dashboardService.addSkill(this.applicantId, skill).subscribe( {
      next: res => {
        this.alertService.showSuccess('dashboard.onlineCV.successSkill', '');
        this.getSkills();
      },
      error: error => {
        this.loadingSkill = false;
        this.alertService.showError('error.error', '');
      }
    });
  }

  addCertification(certification: Certification) {
    this.loadingCertification = true;
    this.dashboardService.addCertification(this.applicantId, certification).subscribe( {
      next: res => {
        this.alertService.showSuccess('dashboard.onlineCV.successCertificate', '');
        this.getCertifications();
      },
      error: error => {
        this.loadingCertification = false;
        this.alertService.showError('error.error', '');
      }
    });
  }

  addQualification(qualification: Qualification) {
    this.loadingQualification = true;
    this.dashboardService.addQualification(this.applicantId, qualification).subscribe( {
      next: res => {
        this.alertService.showSuccess('dashboard.onlineCV.successQualification', '');
        this.getQualifications();
      },
      error: error => {
        this.loadingQualification = false;
        this.alertService.showError('error.error', '');
      }
    });
  }

  addExperience(experience: Experience) {
    this.loadingExperience = true;
    this.dashboardService.addExperience(this.applicantId, experience).subscribe( {
      next: res => {
        this.alertService.showSuccess('dashboard.onlineCV.successExperience', '');
        this.getExperiences();
      },
      error: error => {
        this.loadingExperience = false;
        this.alertService.showError('error.error', '');
      }
    });
  }

  removeSkill() {
    console.log('remove skill', this.skillToRemove);
    this.loadingModal = true;
    this.dashboardService.removeSkill(this.applicantId, this.skillToRemove).subscribe( {
      next: res => {
        this.alertService.showSuccess('dashboard.onlineCV.deleteSkill', '');
        this.getSkills();
        this.closeSkillModal.nativeElement.click();
      },
      error: error => {
        this.loadingModal = false;
        this.alertService.showError('error.error', '');
        this.closeSkillModal.nativeElement.click();
      }
    });
  }

  testClose() {
    this.closeExperienceModal.nativeElement.click();
  }

  removeExperience() {
    this.loadingModal = true;
    this.dashboardService.removeExperience(this.applicantId, this.experienceToRemove).subscribe( {
      next: res => {
        this.alertService.showSuccess('dashboard.onlineCV.deleteExperience', '');
        this.getExperiences();
        this.closeExperienceModal.nativeElement.click();
      },
      error: error => {
        this.loadingModal = false;
        this.alertService.showError('error.error', '');
        this.closeExperienceModal.nativeElement.click();
      }
    });
  }

  removeCertification() {
    this.loadingModal = true;
    this.dashboardService.removeCertification(this.applicantId, this.certificationToRemove).subscribe( {
      next: res => {
        this.alertService.showSuccess('dashboard.onlineCV.deleteCertificate', '');
        this.getCertifications();
        this.closeCertificationModal.nativeElement.click();
      },
      error: error => {
        this.loadingModal = false;
        this.alertService.showError('error.error', '');
        this.closeCertificationModal.nativeElement.click();
      }
    });
  }

  removeQualification() {
    this.loadingModal = true;
    this.dashboardService.removeQualification(this.applicantId, this.qualificationToRemove).subscribe( {
      next: res => {
        this.alertService.showSuccess('dashboard.onlineCV.successQualification', '');
        this.getQualifications();
        this.closeQualificationModal.nativeElement.click();
      },
      error: error => {
        this.loadingModal = false;
        this.alertService.showError('error.error', '');
        this.closeQualificationModal.nativeElement.click();
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
