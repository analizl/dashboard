import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptolistComponent } from './cryptolist.component';

describe('CryptolistComponent', () => {
  let component: CryptolistComponent;
  let fixture: ComponentFixture<CryptolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
