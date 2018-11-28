import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienceInfoComponent } from './audience-info.component';

describe('AudienceInfoComponent', () => {
  let component: AudienceInfoComponent;
  let fixture: ComponentFixture<AudienceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudienceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudienceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
