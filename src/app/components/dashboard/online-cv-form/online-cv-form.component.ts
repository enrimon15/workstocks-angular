import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Skill} from "../../../model/Skill";
import {Experience} from "../../../model/Experience";
import {Qualification} from "../../../model/Qualification";
import {Certification} from "../../../model/Certification";
import {AlertService} from "../../../services/alert/alert.service";

@Component({
  selector: 'app-online-cv-form',
  templateUrl: './online-cv-form.component.html',
  styleUrls: ['./online-cv-form.component.css']
})
export class OnlineCvFormComponent implements OnInit {
  skillForm!: FormGroup;
  qualificationForm!: FormGroup;
  experienceForm!: FormGroup;
  certificationForm!: FormGroup;

  @Input() type?: string;
  @Input() loading: boolean = false;

  @Input() skill?: Skill;
  @Input() certification?: Certification;
  @Input() qualification?: Qualification;
  @Input() experience?: Experience;

  @Output() skillEvent = new EventEmitter<Skill>();
  @Output() experienceEvent = new EventEmitter<Experience>();
  @Output() certificationEvent = new EventEmitter<Certification>();
  @Output() qualificationEvent = new EventEmitter<Qualification>();

  constructor(private fb: FormBuilder, private alertService: AlertService) {
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
      company: [null, [Validators.required, Validators.minLength(3)]],
      inProgress: [false],
    });

    this.qualificationForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      startDate: [null, [Validators.required]],
      endDate: [null],
      description: [null, [Validators.minLength(3)]],
      valuation: [null],
      institute: [null, [Validators.required, Validators.minLength(3)]],
      inProgress: [false],
    });

    this.certificationForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      date: [null, [Validators.required]],
      endDate: [null],
      url: [null, [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      credential: [null, [Validators.required, Validators.minLength(5)]],
      society: [null, [Validators.required, Validators.minLength(3)]],
      noExpiration: [false],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['loading'].currentValue);
    this.loading = changes['loading'].currentValue;
  }

  addSkill() {
    this.skillEvent.emit(this.skillForm.value);
  }

  addQualification() {
    this.qualificationEvent.emit(this.qualificationForm.value);
  }

  addExperience() {
    this.experienceEvent.emit(this.experienceForm.value);
  }

  addCertification() {
    this.certificationEvent.emit(this.certificationForm.value);
  }

  changeInProgress($event: any, type: string) {
    switch (type) {
      case 'EXPERIENCE':
        if ($event.currentTarget.checked) {
          this.experienceForm.controls['endDate'].disable();
        } else {
          this.experienceForm.controls['endDate'].enable();
        }
        break;
      case 'CERTIFICATION':
        if ($event.currentTarget.checked) {
          this.certificationForm.controls['endDate'].disable();
        } else {
          this.certificationForm.controls['endDate'].enable();
        }
        break;
      case 'QUALIFICATION':
        if ($event.currentTarget.checked) {
          this.qualificationForm.controls['endDate'].disable();
        } else {
          this.qualificationForm.controls['endDate'].enable();
        }
        break;
      default:
        this.alertService.showError('error.error', '');
    }
  }

}
