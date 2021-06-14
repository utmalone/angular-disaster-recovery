import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../_services';
import { TimecardService } from '../../_services/timecard.service'
import { first } from 'rxjs/operators';
import { JobService } from '../../_services/jobs.services';
import { MachineService } from '../../_services/machine.service';

@Component({
  selector: 'app-user-submission',
  templateUrl: './user-submission.component.html',
  styleUrls: ['./user-submission.component.less']
})
export class UserSubmissionComponent implements OnInit {


  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  jobs: any[];
  machine: any[];
  selectedJob: number = 0;
  selectedMachine: number = 0;
  mh2: number = 0;
  mh1: number = 0;
  totalH: number = 0;
  totalA: number = 0;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private timecardService: TimecardService,
      private alertService: AlertService,
      private jobService: JobService,
      private machineService: MachineService

  ) {}

  ngOnInit() {

      this.id = this.route.snapshot.params['id'];
      this.isAddMode = !this.id;

      this.machineService.getAll()
      .pipe(first())
      .subscribe(machine => this.machine = machine);

      this.jobService.getAll()
      .pipe(first())
      .subscribe(jobs => this.jobs = jobs);
      
      // password not required in edit mode
      const passwordValidators = [Validators.minLength(6)];
      if (this.isAddMode) {
          passwordValidators.push(Validators.required);
      }

      this.form = this.formBuilder.group({
          code: ['', Validators.required],
          name: ['', Validators.required],
          hours: [''],
          ammount: [''],
          approval: ['Under Review']
      });

      if (!this.isAddMode) {
          this.timecardService.getById(this.id)
              .pipe(first())
              .subscribe(x => this.form.patchValue(x));
      }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  totalHours(){
  this.totalH = (this.mh1 - 10 + 10)+(this.mh2 - 10 + 10)
    return this.totalH;
  }

  totalAmount(){
    this.totalA = (this.selectedJob * this.mh1) + (this.selectedMachine * this.mh2);
    return this.totalA;
  }

  inputChangeHandler (event: any) {
    //update the ui
    this.mh1 = event.target.value;
  }

  inputChangeMachine (event: any) {
    //update the ui
    this.mh2 = event.target.value;
  }

  selectChangeMachine (event: any) {
    //update the ui
    this.selectedMachine = event.target.value;
  }

  selectChangeHandler (event: any) {
    //update the ui
    this.selectedJob = event.target.value;
  }

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
      }
  }

  private createUser() {
      this.timecardService.addTimecard(this.form.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Job submitted successfully', { keepAfterRouteChange: true });
                  this.router.navigate(['/timecard/user'], { relativeTo: this.route });
              },
              error: error => {
                  this.alertService.error(error);
                  this.loading = false;
              }
          });
  }
}
