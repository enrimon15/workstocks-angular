import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApplicantService} from "../../../services/applicant/applicant.service";
import {forkJoin} from "rxjs";
import {User} from "../../../model/User";
import {Skill} from "../../../model/Skill";
import {Experience} from "../../../model/Experience";
import {Qualification} from "../../../model/Qualification";
import {Certification} from "../../../model/Certification";
import { AuthService } from 'src/app/auth/auth.service';
import { EmailService } from 'src/app/services/email/email.service';
import { EmailRequest } from 'src/app/model/EmailRequest';
import * as FileSaver from 'file-saver';
import {AlertService} from "../../../services/alert/alert.service";
import {AppConstants} from "../../../app.constants";

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.css']
})
export class ApplicantDetailsComponent implements OnInit {
  applicantId: number = 0;
  loading: boolean = false;
  loadingCV: boolean = false;
  loadingMail: boolean = false;
  user?: User;
  skills: Skill[] = [];
  experiences: Experience[] = [];
  qualifications: Qualification[] = [];
  certifications: Certification[] = [];
  emailData: EmailRequest;

  @ViewChild('closeMailModal') closeMailModal!: ElementRef;

  constructor(private route: ActivatedRoute, private applicantService: ApplicantService, public authService: AuthService,
              private mailService: EmailService, private alertService: AlertService) {
    this.emailData = {to: '', subject: '', messageBody: ''}
  }

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

  getSkillLevel(assestment: string): number {
    switch (assestment) {
      case 'BEGINNER':
        return 33;
      case 'INTERMEDIATE':
        return 66;
      case 'ADVANCED':
        return 100;
      default:
        return 0;
    }
  }

  getSkillColor(assestment: string) {
    switch (assestment) {
      case 'BEGINNER':
        return "danger";
      case 'INTERMEDIATE':
        return "warning";
      case 'ADVANCED':
        return "success";
      default:
        return null;
    }
  }

  downloadCV() {
    this.loadingCV = true;

    this.applicantService.downloadCv(this.applicantId).subscribe({
      next: (res) => {
        const fileName = `CV_${this.user?.name}_${this.user?.surname}_${this.applicantId}.pdf`
        FileSaver.saveAs(res, fileName)
        this.loadingCV = false;
      },
      error: (error) => {
        this.loadingCV = false;
        this.alertService.showError('profile.cvError', '');
      }
    });
  }

  handleMail() {
    this.loadingMail = true;

    this.emailData.to = this.user?.email ?? '';
    this.emailData.subject = AppConstants.REQUEST_CONTACT;

    this.mailService.sendEmail(this.emailData).subscribe({
      next: (res) => {
        this.loadingMail = false;
        this.alertService.showSuccess('profile.mailSuccess', '');
        this.emailData.messageBody = '';
        this.closeMailModal.nativeElement.click();
      },
      error: (error) => {
        this.loadingMail = false;
        this.alertService.showError('profile.mailError', '');
      }
    });
  }

}
