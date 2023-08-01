import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangelistComponent } from './exchangelist.component';

describe('ExchangelistComponent', () => {
  let component: ExchangelistComponent;
  let fixture: ComponentFixture<ExchangelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
