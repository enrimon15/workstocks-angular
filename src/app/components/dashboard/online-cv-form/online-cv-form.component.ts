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
  }

  ngOnInit(): void {

    this.skillForm = this.fb.group({
      name: [this.skill?.name ?? null, [Validators.required, Validators.minLength(3)]],
      assestment: [this.skill?.assestment ?? 'BEGINNER', [Validators.required, Validators.pattern('^(BEGINNER|INTERMEDIATE|ADVANCED)$')]]
    });

    this.experienceForm = this.fb.group({
      jobPosition: [this.experience?.jobPosition ?? null, [Validators.required, Validators.minLength(3)]],
      startDate: [this.experience?.startDate ?? null, [Validators.required]],
      endDate: [{value: this.experience?.endDate ?? null, disabled: this.experience?.inProgress ? true : false}],
      description: [this.experience?.description ?? null, [Validators.minLength(3)]],
      company: [this.experience?.company ?? null, [Validators.required, Validators.minLength(3)]],
      inProgress: [this.experience?.inProgress ?? false],
    });

    this.qualificationForm = this.fb.group({
      name: [this.qualification?.name ?? null, [Validators.required, Validators.minLength(3)]],
      startDate: [this.qualification?.startDate ?? null, [Validators.required]],
      endDate: [{value: this.qualification?.endDate ?? null, disabled: this.qualification?.inProgress ? true : false}],
      description: [this.qualification?.description ?? null, [Validators.minLength(3)]],
      valuation: [this.qualification?.valuation ?? null],
      institute: [this.qualification?.institute ?? null, [Validators.required, Validators.minLength(3)]],
      inProgress: [this.qualification?.inProgress ?? false],
    });

    this.certificationForm = this.fb.group({
      name: [this.certification?.name ?? null, [Validators.required, Validators.minLength(3)]],
      date: [this.certification?.date ?? null, [Validators.required]],
      endDate: [{value: this.certification?.endDate ?? null, disabled: this.certification?.noExpiration ? true : false}],
      url: [this.certification?.url ?? null, [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      credential: [this.certification?.credential ?? null, [Validators.required, Validators.minLength(5)]],
      society: [this.certification?.society ?? null, [Validators.required, Validators.minLength(3)]],
      noExpiration: [this.certification?.noExpiration ?? false],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loading = changes['loading'].currentValue;
    if (changes['skill']) this.skill = changes['skill'].currentValue;
    if (changes['experience']) this.experience = changes['experience'].currentValue;
    if (changes['qualification']) this.qualification = changes['qualification'].currentValue;
    if (changes['certification']) this.certification = changes['certification'].currentValue;
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
