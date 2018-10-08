import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveBoardComponent } from './live-board.component';

describe('LiveBoardComponent', () => {
  let component: LiveBoardComponent;
  let fixture: ComponentFixture<LiveBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
