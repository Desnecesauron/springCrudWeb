import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  blockPaste(pasteEvent: any) {
    pasteEvent.preventDefault();
  }
}
