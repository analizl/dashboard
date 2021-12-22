import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCryptoComponent } from './new-crypto.component';

describe('NewCryptoComponent', () => {
  let component: NewCryptoComponent;
  let fixture: ComponentFixture<NewCryptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCryptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
