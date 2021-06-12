import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MachineLayoutComponent } from './machine-layout.component';
import { MachinesComponent } from './machines.component';
import { AddEditMachineComponent } from './add-edit-machine/add-edit-machine.component';

const routes: Routes = [
    {
        path: '', component: MachineLayoutComponent,
        children: [
            { path: '', component: MachinesComponent },
            { path: 'machine/add', component: AddEditMachineComponent },
            { path: 'machine/edit/:id', component: AddEditMachineComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MachineRoutingModule { }