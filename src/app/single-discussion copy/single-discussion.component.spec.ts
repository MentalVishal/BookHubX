import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDiscussionComponent } from './single-discussion.component';

describe('SingleDiscussionComponent', () => {
  let component: SingleDiscussionComponent;
  let fixture: ComponentFixture<SingleDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleDiscussionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
