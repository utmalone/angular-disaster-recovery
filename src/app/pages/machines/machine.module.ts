import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MachineRoutingModule } from './machine-routing.module';
import { MachineLayoutComponent } from './machine-layout.component';
import { MachinesComponent } from './machines.component';
import { AddEditMachineComponent } from './add-edit-machine/add-edit-machine.component';
import { JobsModule } from '../jobs/jobs.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MachineRoutingModule,
        JobsModule
    ],
    declarations: [
        MachineLayoutComponent,
        MachinesComponent,
        AddEditMachineComponent,
    ]
})
export class MachineModule { }