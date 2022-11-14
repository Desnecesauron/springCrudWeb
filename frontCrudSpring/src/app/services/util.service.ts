import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  blockEvent(pasteEvent: any) {
    pasteEvent.preventDefault();
  }

  public setMaskOnlyLetters(input: string) {
    input = this.removeSpacesInInitial(input);

    // input.value = this.uppercaseFirstLetter(input.value);
    input = input.replace(
      /[^a-zA-ZâãàáéèêẽîĩìíôõóòũûúùÂÃÀÁÉÈÊẼÎĨÌÍÔÕÓÒŨÛÚÙçÇ ]/gi,
      ''
    );
    // console.log('Entrou');
    return input;
  }

  public removeSpacesInInitial(str: string): string {
    do {
      if (str.charAt(0) === ' ') {
        str = str.substring(1);
      } else {
        break;
      }
    } while (true);
    return str;
  }

  public keyPressIsEnter($event: any): boolean {
    if ($event.key === 'Enter') {
      return true;
    }
    return false;
  }
}
