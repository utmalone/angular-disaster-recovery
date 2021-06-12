import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../_services/machine.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.less']
})
export class MachinesComponent implements OnInit {
  machine: any[];

  constructor(private accountService: MachineService) {}

  ngOnInit() {
      this.accountService.getAll()
          .pipe(first())
          .subscribe(machine => this.machine = machine);
  }

  deleteJobs(id: string) {
    const user = this.machine.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
        .pipe(first())
        .subscribe(() => this.machine = this.machine.filter(x => x.id !== id));
  }
}
