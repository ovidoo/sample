import { NgModule } from '@angular/core';
import { AdminRouting } from './admin.routing';
import { SkillManagementModule } from  './skill-management/skill-management.module';

const COMPONENTS = [

];

@NgModule({
  imports     : [
    AdminRouting,
    SkillManagementModule
  ],
  exports     : [],
  declarations: COMPONENTS,
  providers   : [],
})

export class AdminModule {
}
