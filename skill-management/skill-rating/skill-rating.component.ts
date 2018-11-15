import {Component, Input, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'dof-skill-rating',
  templateUrl: 'skill-rating.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SkillRatingComponent implements OnInit {
  @Input() currentRating: string;
  @Output() changeRating = new EventEmitter();

  initialRating: string;
  ratingRange: number[];

  ngOnInit() {
    this.buildRanges();
    this.initialRating = this.currentRating;
  }

  transformToNumber(rating: string): number {
    return parseInt(rating);
  }

  setRating(rating: string) {
    this.currentRating = rating.toString();
    this.changeRating.emit(rating);
  }

  private buildRanges() {
    this.ratingRange = this.range(1, 5);
  }

  private range(start: number, end: number): number[] {
    const foo: number[] = [];
    for (let i = start; i <= end; i++) {
      foo.push(i);
    }
    return foo;
  }
}
