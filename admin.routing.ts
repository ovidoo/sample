import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { SkillManagementComponent} from './skill-management/skill-management.component';

const routes: Routes = [
  { path: '', component: SkillManagementComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRouting {
}
