import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UtilsService {
    constructor() {}

  createRangeArray(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}