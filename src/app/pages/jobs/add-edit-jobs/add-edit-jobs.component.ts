import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/_services';
import { JobService } from '@app/_services/jobs.services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-jobs',
  templateUrl: './add-edit-jobs.component.html',
  styleUrls: ['./add-edit-jobs.component.less']
})
export class AddEditJobsComponent implements OnInit {
  
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private jobService: JobService,
      private alertService: AlertService
  ) {}

  ngOnInit() {
      this.id = this.route.snapshot.params['code'];
      this.isAddMode = !this.id;
      
      // password not required in edit mode
      // const passwordValidators = [Validators.minLength(6)];
      // if (this.isAddMode) {
      //     passwordValidators.push(Validators.required);
      // }

      this.form = this.formBuilder.group({
          code: ['', Validators.required],
          description: ['', Validators.required],
          rate: ['', Validators.required],
          hours: ['', Validators.required]
      });

      if (!this.isAddMode) {
          this.jobService.getById(this.id)
              .pipe(first())
              .subscribe(x => this.form.patchValue(x));
      }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      if (this.isAddMode) {
          this.createUser();
      } else {
          this.updateUser();
      }
  }

  private createUser() {
      this.jobService.register(this.form.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Job added successfully', { keepAfterRouteChange: true });
                  this.router.navigate(['../'], { relativeTo: this.route });
              },
              error: error => {
                  this.alertService.error(error);
                  this.loading = false;
              }
          });
  }

  private updateUser() {
      this.jobService.update(this.id, this.form.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Update successful', { keepAfterRouteChange: true });
                  this.router.navigate(['../../'], { relativeTo: this.route });
              },
              error: error => {
                  this.alertService.error(error);
                  this.loading = false;
              }
          });
  }
}
