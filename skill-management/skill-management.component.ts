import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AgentUtils} from '@utils/agent.utils';
import {SkillEditDialog} from './skill-edit/skill-edit-dialog.component';
import {Skill, SkillsType} from '@store/agent/skill.model';
import {Observable} from 'rxjs/Observable';
import {Agent} from '@store/agent/agent.model';
import {Store} from '@ngrx/store';
import * as fromRoot from '@store';
import {Subscription} from 'rxjs/Subscription';
import * as fromSyncActions from '@store/sync/sync.actions';
import {MatDialog} from '@angular/material';
import * as fromLayout from '@store/layout/layout.actions';
import {SkillFocusDialog} from './skill-focus-dialog/skill-focus-dialog.component';
import {EnumUtils} from "@utils/enum";

@Component({
  templateUrl: 'skill-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SkillManagementComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private salesMap: Map<string, boolean> = new Map<string, boolean>();
  private servicingMap: Map<string, boolean> = new Map<string, boolean>();

  editingSkills: boolean = false;
  agents$: Observable<Agent[]>;
  skillsList: Array<string | number> = EnumUtils.getStringValues(SkillsType);
  isSkillFocus = AgentUtils.isSkillEnabled;
  getSkillRating = AgentUtils.getSkillRating;

  constructor(private store: Store<fromRoot.State>,
              private dialog: MatDialog) {
              this.store.dispatch(new fromLayout.UpdateTitleAction('SKILL_MANAGEMENT_PAGE.TITLE_EDIT_FOCUS'));
  }

  ngOnInit() {
    this.agents$ = this.store.select(fromRoot.getAllAgents);
    this.subscription = this.agents$.subscribe((agents: Agent[]) => {
      _.map(agents, (agent: Agent) => {
        _.map(agent.skills, (skill: Skill) => {
          switch (skill.name) {
            case SkillsType.Sales:
              this.salesMap.set(agent.perId, skill.focus);
              break;
            case SkillsType.Servicing:
              this.servicingMap.set(agent.perId, skill.focus);
              break;
            default: // BIZZ case
              break;
          }
        });
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  actionSkill(agent: Agent, type: SkillsType) {
    if (this.editingSkills) {
      this.editSkills(agent, type);
    } else {
      if (type !== SkillsType.Bizz) {
        this.changeFocus(agent, type);
      }
    }
  }

  changeFocus(agent: Agent, type: SkillsType) {
    const focusedSalesAgentsCount = Array.from(this.salesMap.values())
      .filter(focus => focus === true).length;
    const focusedServicingAgentsCount = Array.from(this.servicingMap.values())
      .filter(focus => focus === true).length;
    const skillFocus: boolean = AgentUtils.isSkillEnabled(type, agent);

    if (skillFocus && type === SkillsType.Sales && focusedSalesAgentsCount === 1
      || skillFocus && type === SkillsType.Servicing && focusedServicingAgentsCount === 1) {

      this.dialog.open(SkillFocusDialog, {data: {type}});

    } else {
      this.updateAgent(AgentUtils.changeFocus(type, agent));
    }
  }

  editSkills(agent: Agent, type: SkillsType) {

    const rating: string = AgentUtils.getSkillRating(type, agent);

    const dialogRef = this.dialog.open(SkillEditDialog, {
      data: {
        agent,
        type,
        rating
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data && data['newRating']) {
        this.updateAgent(AgentUtils.changeRating(type, agent, data['newRating']));
      }
    });
  }

  private updateAgent(agent: Agent) {
    this.store.dispatch(new fromSyncActions.UpdateDoc(agent));
  }

  enableSkillsEditing() {
    this.editingSkills = !this.editingSkills;

    if (this.editingSkills) {
      this.store.dispatch(new fromLayout.UpdateTitleAction('SKILL_MANAGEMENT_PAGE.TITLE_EDIT_SKILLS'));
    } else {
      this.store.dispatch(new fromLayout.UpdateTitleAction('SKILL_MANAGEMENT_PAGE.TITLE_EDIT_FOCUS'));
    }
  }
}
