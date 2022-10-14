import { Component, createComponent, OnInit } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { __values } from 'tslib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  titlePage = 'Clinic Plus';

  constructor(private title: Title) {
    document.body.style.setProperty('--cor-um', '#E0E0E0');
    document.body.style.setProperty('--cor-background-inputs', '#294852');
    document.body.style.setProperty('--cor-inputs-active', '#2c4c57d1');
    document.body.style.setProperty('--cor-inputs-disabled', '#5c4c57d1');
    document.body.style.setProperty('--cor-btns', '#E2E2E2');

    document.body.style.setProperty('--visible-login', 'none');
    document.body.style.setProperty('--visible-register', 'none');
    document.body.style.setProperty('--visible-modal', 'none');
    document.body.style.setProperty('--visible-homePage', 'flex');
  }

  ngOnInit() {
    this.title.setTitle(this.titlePage);
  }

  public dataForm: {
    nome: string;
    cpf: string;
    endereco: string;
    cep: string;
    cidade: string;
    medico: boolean;
    crm: string;
  } = {
    nome: '',
    cpf: '',
    endereco: '',
    cep: '',
    cidade: '',
    medico: false,
    crm: '',
  };

  public openLogin() {
    document.body.style.setProperty('--visible-login', 'block');
    document.body.style.setProperty('--visible-modal', 'block');
    document.body.style.setProperty('--visible-homePage', 'none');
    document.getElementById('linkBackPageLog')?.focus();
  }

  public openRegister() {
    document.body.style.setProperty('--visible-register', 'block');
    document.body.style.setProperty('--visible-modal', 'block');
    document.body.style.setProperty('--visible-homePage', 'none');
    document.getElementById('linkBackPageReg')?.focus();
  }

  public closeRegister() {
    document.body.style.setProperty('--visible-register', 'none');
    document.body.style.setProperty('--visible-modal', 'none');
    document.body.style.setProperty('--visible-homePage', 'flex');
    document.getElementById('btnLog')?.focus();
  }

  public closeLogin() {
    document.body.style.setProperty('--visible-login', 'none');
    document.body.style.setProperty('--visible-modal', 'none');
    document.body.style.setProperty('--visible-homePage', 'flex');
    document.getElementById('btnLog')?.focus();
  }

  public postLogin() {
    // console.log(this.dataForm)

    if (this.dataForm.cpf == '' && this.dataForm.nome == '') {
      alert('Insira os dados!!');
      return;
    }

    if (!this.nameVerify()) {
      return;
    }

    if (!this.TestaCPF()) {
      alert('Mó cota fazendo isso pra tu colocar CPF inválido :(');
      return;
    }

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://crudclinics.herokuapp.com/listPersons/cpf/' +
        this.desformatAnyCpf(this.dataForm.cpf)
    )
      .then((response) => response.text())
      .then((result) => {
        var resultJson = JSON.parse(result);
        console.log('Resultado:' + result);
        console.log(resultJson.status);
        if (resultJson.status == '404') {
          alert('Cadastro não encontrado!');
          return;
        }

        if (
          resultJson.nome == this.dataForm.nome &&
          resultJson.cpf == this.desformatAnyCpf(this.dataForm.cpf)
        ) {
          alert('Bem-vindo, ' + this.dataForm.nome + '!');
        } else {
          alert('Cadastro não bate!!');
          return;
        }
      })
      .catch((error) => console.log('error', error));

    return;
  }

  public postRegister() {
    console.log(this.dataForm);
  }

  public formatCpf() {
    const input = document.getElementById('CpfText') as HTMLInputElement | null;
    var value = input?.value;

    if (value == '' || value == null) {
      return;
    }

    if (value.trim() == '') {
      value = value.trim();
      this.dataForm.cpf = value;
      return;
    }

    let valorFormatado = value + '';

    do {
      if (valorFormatado.includes('.') || valorFormatado.includes('-')) {
        valorFormatado = valorFormatado.replace('.', '');
        valorFormatado = valorFormatado.replace('-', '');
      } else {
        break;
      }
    } while (true);

    if (!this.onlyNumbers(valorFormatado)) {
      do {
        if (valorFormatado.length == 0) break;
        if (!this.onlyNumbers(valorFormatado)) {
          valorFormatado = valorFormatado.substring(
            0,
            valorFormatado.length - 1
          );
        } else {
          break;
        }
      } while (true);

      this.dataForm.cpf = valorFormatado;
      if (valorFormatado.length == 0) return;
    }

    valorFormatado = valorFormatado
      .padStart(11, '0') // item 1
      .substring(0, 11) // item 2
      .replace(/[^0-9]/, '') // item 3
      .replace(
        // item 4
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4'
      );

    this.dataForm.cpf = valorFormatado;
    return valorFormatado;
  }

  public desformatCpf() {
    const input = document.getElementById('CpfText') as HTMLInputElement | null;
    var value = input?.value;

    if (value == '' || value == null) {
      return;
    }

    let valorFormatado = value + '';

    value = this.desformatAnyCpf(valorFormatado);

    var i = 0;
    while (value[i]) {
      if (value[i] != '0') {
        break;
      } else {
        i++;
      }
    }
    value = value.substring(i);
    valorFormatado = value;

    this.dataForm.cpf = valorFormatado;
    return valorFormatado;
  }

  public desformatAnyCpf(strCPF: string): string {
    do {
      if (strCPF.includes('.') || strCPF.includes('-')) {
        strCPF = strCPF.replace('.', '');
        strCPF = strCPF.replace('-', '');
      } else {
        break;
      }
    } while (true);

    return strCPF;
  }

  public TestaCPF(): boolean {
    var strCPF = this.desformatAnyCpf(this.dataForm.cpf);
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == '00000000000') return false;

    for (var i = 1; i <= 9; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }

  public formatName() {
    const me = document.getElementById('NameText') as HTMLInputElement | null;

    if (me == null) {
      return;
    }

    if (me.value.startsWith(' ')) {
      me.value = me.value.substring(1);
    }

    if (me.value.endsWith('  ')) {
      me.value = me.value.substring(0, me.value.length - 1);
    }
  }

  public nameVerify(): boolean {
    const me = document.getElementById('NameText') as HTMLInputElement | null;

    if (me?.value.trim() == '' && me?.value.length == 0) {
      return false;
    }

    if (me?.value.trim() == '' && me?.value.length > 0) {
      alert('Existe apenas espaços no nome!!!');
      return false;
    }

    if (me?.value.endsWith(' ')) {
      me.value = me.value.substring(0, me.value.length - 1);
    }

    if (me == null) {
      return false;
    }

    if (!this.onlyLetters(me.value)) {
      alert('Existe caracteres especiais no nome!!!');
    } else {
      return true;
    }

    return false;
  }

  public onlyLetters(str: string): boolean {
    str = str.trim().toLowerCase();
    return /^[a-zA-Z\s]+$/.test(str);
  }

  public onlyNumbers(str: string): boolean {
    return /^[0-9]+$/.test(str);
  }

  //------------------------------------------------------------------------------------------

  public setMaskCPF() {
    var cpf = this.dataForm.cpf;
    var num = cpf.replace(/[^\d]/g, ''); //remove todos os caracteres não numéricos
    var len = num.length; //guarda o número de digitos até o momento

    if (len <= 6) {
      cpf = num.replace(/(\d{3})(\d{1,3})/g, '$1.$2');
    } else if (len <= 9) {
      cpf = num.replace(/(\d{3})(\d{3})(\d{1,3})/g, '$1.$2.$3');
    } else {
      cpf = num.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/g, '$1.$2.$3-$4');
    }

    this.dataForm.cpf = cpf;
  }

  public setMaskCEP() {
    var cep = this.dataForm.cep;
    var num = cep.replace(/[^\d]/g, ''); //remove todos os caracteres não numéricos
    cep = num.replace(/(\d{5})(\d{1,3})/g, '$1-$2');
    if (cep.length == 10) cep = cep.substring(0, cep.length - 1);
    this.dataForm.cep = cep;
  }

  public setMaskCRM() {
    var crm = this.dataForm.crm;
    crm = crm.replace('/', '');
    var numPart = crm.substring(0, 6).replace(/\s+/g, '').replace(/[^\d]/g, '');

    var lettersPart = crm
      .substring(6, 8)
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/gi, '');
    // 123456/SP
    crm = numPart.replace(/ ([0-9]{1,6}) /g, '$1');
    if (lettersPart.toUpperCase() != '') {
      crm += `/` + lettersPart.toUpperCase().replace(/ ([A-Z]{0,2}) /g, '$1');
    }
    this.dataForm.crm = crm;
  }

  public setMaskOnlyLetters(id: string) {
    console.log('id: ' + id);
    var input = document.getElementById(id) as HTMLInputElement;
    input.value = input.value.replace(
      /[^a-zA-ZâãàáéèêẽîĩìíôõóòũûúùÂÃÀÁÉÈÊẼÎĨÌÍÔÕÓÒŨÛÚÙ ]/gi,
      ''
    );
  }
}
