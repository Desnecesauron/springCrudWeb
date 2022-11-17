import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class JwtServicesService {
  constructor() {}

  public message: string | any;
  public password: string =
    'P1@A1KV7Fl8KpbPsOBY#@f7D4266Dw3tI8ulTYrM7bC*t0%32*OyqT2kUg4jXFT*';
  public encryptedMessage: string | any;
  public decryptedMessage: string | any;

  encrypt(data: string, path: string) {
    this.message = data;
    // console.log(JSON.parse(this.message));

    this.encryptedMessage = CryptoJS.AES.encrypt(
      this.message.trim(),
      this.password.trim()
    ).toString();

    localStorage.setItem(path, this.encryptedMessage);
    // console.log('Stored: ' + localStorage.getItem(path));
  }

  decrypt(pathData: string) {
    this.encryptedMessage = localStorage.getItem(pathData);

    this.decryptedMessage = CryptoJS.AES.decrypt(
      this.encryptedMessage,
      this.password.trim()
    ).toString(CryptoJS.enc.Utf8);
    return JSON.parse(this.decryptedMessage);
    // console.log(JSON.parse(this.decryptedMessage));
  }
}
