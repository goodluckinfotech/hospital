import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmenthistoryPage } from './appoinmenthistory.page';

describe('AppoinmenthistoryPage', () => {
  let component: AppoinmenthistoryPage;
  let fixture: ComponentFixture<AppoinmenthistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppoinmenthistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoinmenthistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
