import {TestBed} from '@angular/core/testing';
import {DataServiceService as DataService} from './data.service';


describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });
});
