import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { IFocusDialogData } from '../skill.interface';
import { SkillDialog } from '../skill-dialog.component';

@Component({
  selector: 'dof-skill-focus-dialog',
  templateUrl: 'skill-focus-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SkillFocusDialog extends SkillDialog{
  constructor(@Inject(MAT_DIALOG_DATA) data: IFocusDialogData) {
    super(data);
  }
}
