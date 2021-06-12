import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../_services';
import { MachineService } from '../../../_services/machine.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-machine',
  templateUrl: './add-edit-machine.component.html',
  styleUrls: ['./add-edit-machine.component.less']
})
export class AddEditMachineComponent implements OnInit {
  
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private jobService: MachineService,
      private alertService: AlertService
  ) {}

  ngOnInit() {
      this.id = this.route.snapshot.params['id'];
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
      this.jobService.addJob(this.form.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Machine added successfully', { keepAfterRouteChange: true });
                  this.router.navigate(['../../'], { relativeTo: this.route });
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
                  this.router.navigate(['../../../'], { relativeTo: this.route });
              },
              error: error => {
                  this.alertService.error(error);
                  this.loading = false;
              }
          });
  }
}
