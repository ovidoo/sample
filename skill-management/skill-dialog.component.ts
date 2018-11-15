import {SkillsType} from '@store/agent/skill.model';

export class SkillDialog {
  skillName: SkillsType;

  constructor(protected data: any) {
    this.skillName = this.data.type;
  }
}
