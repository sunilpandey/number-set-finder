import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetGeneraterService {

  constructor() { }

  private pair(arr: number[], sumPair: number[], sum: number): number[][] {
    const allPairs: number[][] = [];
    for (let i = 0; i < arr.length; i++) {
      const firstItem = arr[i];
      /**
       * Second pair will only be the minus of sum - first pair
       */
      const secondPair = sum - firstItem;
      
      const remainingArrayToSearch = arr.slice(i + 1);
      // Look for second pair in the remaining search array.
      const secondPairIndex = remainingArrayToSearch.indexOf(secondPair);
      if (secondPairIndex !== -1) {
        allPairs.push([...sumPair, firstItem, secondPair]);
      }
    }
    return allPairs;
  }

  public findNumberSets(arr: number[], sum: number, length: number, sumPair: number[] = []): number[][] {
    if (length < 2 || !arr?.length || length < 0 ) return [];
    
    if (length == 2) {
      // If length is 2 find the remaining 2 pairs which can make set whose sum is same as provided. 
      return this.pair(arr, sumPair, sum);
    } else {
      // If length is greater then first create length - 2 combination
      const allPairs = []
      for (let i = 0; i <= arr.length - length; i++) {
        const firstPair = arr[i];
        allPairs.push(...this.findNumberSets(arr.slice(i + 1), 
                                              sum - firstPair, 
                                              length - 1, 
                                              [...sumPair, firstPair]));
      }
      return allPairs;
    }
  }
}
