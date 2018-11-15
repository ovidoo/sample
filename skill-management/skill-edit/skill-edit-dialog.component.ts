import {Component, ChangeDetectionStrategy,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {AgentPerson} from '@store/agent/agent-person.model';
import {IEditDialogData} from '../skill.interface';
import {SkillDialog} from '../skill-dialog.component';

@Component({
  selector   : 'dof-skill-edit-dialog',
  templateUrl: 'skill-edit-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SkillEditDialog extends SkillDialog {
  agent: AgentPerson;
  currentRating: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: IEditDialogData,
    private dialogRef: MatDialogRef<SkillEditDialog>) {
    super(data);
    this.agent = this.data.agent;
    this.currentRating = this.data.rating;
  }
  confirm(){
    this.dialogRef.close({newRating: this.currentRating});
  }
  changeRating(rating: number) {
    this.currentRating = rating.toString();
  }

}
