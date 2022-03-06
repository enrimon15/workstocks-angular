import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {DashboardService} from "../../../services/dashboard/dashboard.service";
import {ApplicantService} from "../../../services/applicant/applicant.service";
import {AlertService} from "../../../services/alert/alert.service";
import {AuthService} from "../../../auth/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../validators/CustomValidators";
import {FileSnippet} from "../../../model/FileSnippet";
import {SummernoteOptions} from "ngx-summernote/lib/summernote-options";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  applicantId!: number;
  profileForm!: FormGroup;
  loading: boolean = false;
  loadingProfile: boolean = false;
  loadingPhoto: boolean = false;
  photo!: FileSnippet;
  photoFileName: string = '';

  summernoteConfig: SummernoteOptions = {
    placeholder: '',
    tabsize: 2,
    height: 200,
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['bold', 'italic', 'underline']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  }

  constructor(private fb: FormBuilder, private customValidator: CustomValidators, private authService: AuthService,
              private dashboardService: DashboardService, private applicantService: ApplicantService, private alertService: AlertService) {
    this.getLoggedUser();
  }

  ngOnInit(): void {
  }


  private getLoggedUser() {
    this.loading = true;
    this.applicantId = this.authService.getUserLogged()?.id ?? 0;
    this.applicantService.getById(this.authService.getUserLogged()?.id ?? 0).subscribe( res => {
      this.profileForm = this.fb.group({
        name: [res.name, [Validators.required, Validators.minLength(3)]],
        surname: [res.surname, [Validators.required, Validators.minLength(3)]],
        email: [res.email, [Validators.required, Validators.email], this.customValidator.checkUniqueEmail()],
        jobTitle: [res.jobTitle, [Validators.minLength(3)]],
        overview: [res.overview, [Validators.minLength(3)]],
        website: [res.website, [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
        phoneNumber: [res.phoneNumber, [Validators.minLength(8)]],
        dateOfBirth: [res.dateOfBirth],
        minimumExpectedSalary: [res.minimumExpectedSalary, [Validators.min(0)]],
        gender: [res.gender, [Validators.pattern('^(MALE|FEMALE|M|F)$')]],
        address: new FormGroup({
          city: new FormControl(res.address?.city, [Validators.minLength(3)]),
          country: new FormControl(res.address?.country, [Validators.minLength(2)])
        })
      });
      this.loading = false;
    });
  }

  updateProfile() {
    this.loadingProfile = true;
    this.dashboardService.updateProfile(this.profileForm.value, this.applicantId).subscribe( {
      next: res => {
        this.loadingProfile = false;
        this.alertService.showSuccess('dashboard.profile.success', '');
      },
      error: error => {
        this.loadingProfile = false;
        this.alertService.showError('dashboard.profile.error', '');
      }
    });
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.photo = new FileSnippet(event.target.result, file);
      this.photoFileName = file.name;
    });

    reader.readAsDataURL(file);
  }

  uploadPhoto() {
    this.loadingPhoto = true;
    this.dashboardService.updatePhoto(this.photo.file, this.applicantId).subscribe( {
      next: res => {
        this.loadingPhoto = false;
        this.alertService.showSuccess('dashboard.profile.success', '');
      },
      error: error => {
        this.loadingPhoto = false;
        this.alertService.showError('dashboard.profile.error', '');
      }
    });
  }
}
