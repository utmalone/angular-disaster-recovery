import { Component, OnInit } from '@angular/core';
import { JobService } from '../../_services/jobs.services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.less']
})
export class JobsComponent implements OnInit {
  jobs = null;

  constructor(private accountService: JobService) {}

  ngOnInit() {
      this.accountService.getAll()
          .pipe(first())
          .subscribe(jobs => this.jobs = jobs);
  }

  deleteUser(code: string) {
      const user = this.jobs.find(x => x.id === code);
      user.isDeleting = true;
      this.accountService.delete(code)
          .pipe(first())
          .subscribe(() => this.jobs = this.jobs.filter(x => x.id !== code));
  }
}
