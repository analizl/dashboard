import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailExchangeComponent } from './detail-exchange.component';

describe('DetailExchangeComponent', () => {
  let component: DetailExchangeComponent;
  let fixture: ComponentFixture<DetailExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
