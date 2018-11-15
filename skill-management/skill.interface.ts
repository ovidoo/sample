import {SkillsType} from "@store/agent/skill.model";
import {Agent} from "@store/agent/agent.model";

export interface IFocusDialogData{
  type: SkillsType;
}

export interface IEditDialogData extends IFocusDialogData{
  agent: Agent;
  rating: string;
}
