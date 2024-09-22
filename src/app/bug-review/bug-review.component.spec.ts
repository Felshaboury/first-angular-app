import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReviewComponent } from './bug-review.component';

describe('BugReviewComponent', () => {
  let component: BugReviewComponent;
  let fixture: ComponentFixture<BugReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
