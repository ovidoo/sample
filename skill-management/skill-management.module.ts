import {NgModule} from '@angular/core';
import {SkillManagementComponent} from './skill-management.component';
import {SkillInfoComponent} from './skill-info/skill-info.component';
import {SharedModule} from '@shared/shared.module';
import {SkillEditDialog} from './skill-edit/skill-edit-dialog.component';
import {SkillRatingComponent} from './skill-rating/skill-rating.component';
import {SkillFocusDialog} from './skill-focus-dialog/skill-focus-dialog.component';

const COMPONENTS = [
  SkillManagementComponent,
  SkillInfoComponent,
  SkillEditDialog,
  SkillRatingComponent,
  SkillFocusDialog
];

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [],
  declarations: COMPONENTS,
  providers: [],
  entryComponents: [SkillEditDialog, SkillFocusDialog]
})
export class SkillManagementModule {
}
