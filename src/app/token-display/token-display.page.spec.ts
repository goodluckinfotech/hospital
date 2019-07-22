import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenDisplayPage } from './token-display.page';

describe('TokenDisplayPage', () => {
  let component: TokenDisplayPage;
  let fixture: ComponentFixture<TokenDisplayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenDisplayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenDisplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
