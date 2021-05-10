import { TestBed } from '@angular/core/testing';

import { SetGeneraterService } from './set-generater.service';

describe('SetGeneraterService', () => {
  let service: SetGeneraterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetGeneraterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("Invalid value handling", () => {
    const arr: number[] = []
    expect(service.findNumberSets([], 4, 1)).toEqual([]);
    expect(service.findNumberSets(arr, 0, 0)).toEqual([]);
  })

  it("Valid value handling with size 2", () => {
    let arr: number[] = [1, 4, 3, 2, -6, 5, 0]
    expect(service.findNumberSets(arr, 5, 2)).toEqual([[1, 4], [3, 2], [5, 0]])

    arr = [1, 2, -1];
    expect(service.findNumberSets(arr, 0, 2)).toEqual([[1, -1]]);
  })
});
