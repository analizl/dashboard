import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTradeComponent } from './detail-trade.component';

describe('DetailTradeComponent', () => {
  let component: DetailTradeComponent;
  let fixture: ComponentFixture<DetailTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
