import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabularOverviewComponent } from './tabular-overview.component';

describe('TabularOverviewComponent', () => {
  let component: TabularOverviewComponent;
  let fixture: ComponentFixture<TabularOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabularOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabularOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
