import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter} from '@angular/core';
import {SkillsType} from '@store/agent/skill.model';

@Component({
  selector: 'dof-skill-info',
  templateUrl: 'skill-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillInfoComponent {
  @Input() editingSkills: boolean;
  @Input() type: SkillsType;
  @Input() focus: boolean;
  @Input() rating: string;
  @Input() agentId: string;
  @Output() actionSkill = new EventEmitter();

  skillsType = SkillsType;
}
