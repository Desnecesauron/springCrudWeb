import { createMayBeForwardRefExpression } from '@angular/compiler';
import { Component, createComponent, OnInit } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { __values } from 'tslib';
import { DataUser } from '../interfaces/data-user';
import { JwtServicesService } from '../services/jwt-services.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  titlePage = 'Clinic Plus';

  constructor(
    private title: Title,
    private router: Router,
    public utilService: UtilService,
    public jwtService: JwtServicesService
  ) {
    // a?.addEventListener('paste', ($event) => {
    //   $event?.preventDefault();
    //   console.log('Entrou');
    // });
  }

  ngOnInit() {
    this.title.setTitle(this.titlePage);

    const a = document.querySelectorAll('input');
    a.forEach((input) => {
      input?.addEventListener('contextmenu', ($event) => {
        $event?.preventDefault();
      });

      input?.addEventListener('drop', ($event) => {
        $event?.preventDefault();
      });
    });
  }

  // interface SignupForm {
  //   nome: string,

  // }

  protected dataForm: DataUser = {
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

  isEnterPressedLogin($event: KeyboardEvent) {
    if (this.utilService.keyPressIsEnter($event)) this.postLogin();
  }

  isEnterPressedRegister($event: KeyboardEvent) {
    if (this.utilService.keyPressIsEnter($event)) this.postRegister();
  }

  public postLogin() {
    if (this.dataForm.cpf == '' || this.dataForm.nome.trim() == '') {
      alert('Insira os dados!!');
      return;
    } else {
      if (!this.TestaCPF()) {
        alert('Digite um CPF válido!');
        return;
      } else {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow',
        };

        fetch(
          'https://crudclinics.herokuapp.com/listPersons/cpf/' +
            this.undoFormatAnyCpf(this.dataForm.cpf)
        )
          .then((response) => response.text())
          .then((result) => {
            var resultJson = JSON.parse(result);
            // console.log('Resultado:' + result);
            // console.log(result);
            // console.log(resultJson);
            // console.log(resultJson.status);

            if (resultJson?.message?.includes('Page not found')) {
              alert(
                'Ocorreu um erro. Tente novamente mais tarde ou contate o administrador.'
              );
              return;
            }
            if (resultJson?.status == '404') {
              alert('Cadastro não encontrado!');
              return;
            }

            if (
              resultJson.nome == this.dataForm.nome &&
              resultJson.cpf == this.undoFormatAnyCpf(this.dataForm.cpf)
            ) {
              // alert('Bem-vindo, ' + this.dataForm.nome + '!');
              this.jwtService.encrypt(result, 'jsonUser');
              this.router.navigateByUrl('/index');
            } else {
              alert('Cadastro não bate!!');
              return;
            }
          })
          .catch((error) => console.log('error', error));
      }
    }

    return;
  }

  public postRegister() {
    // console.log(this.dataForm);
    // Bernardino - Falcão
    // 17050-050
    if (
      this.dataForm.nome.trim() == '' ||
      this.dataForm.cpf == '' ||
      this.dataForm.endereco.trim().length < 10 ||
      this.dataForm.cep.length != 9 ||
      this.dataForm.cidade.length < 3 ||
      (this.dataForm.medico && this.dataForm.crm.length < 7)
    ) {
      alert('Insira os dados!!');
      return;
    } else {
      if (!this.TestaCPF()) {
        alert('Digite um CPF válido!');
        return;
      } else {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
          id: null,
          nome: this.dataForm.nome,
          cpf: Number(this.undoFormatAnyCpf(this.dataForm.cpf)),
          excluido: false,
          endereco: this.dataForm.endereco,
          cep: Number(this.undoFormatAnyCpf(this.dataForm.cep)),
          cidade: this.dataForm.cidade,
          medico: this.dataForm.medico,
          crm: this.dataForm.crm,
        });

        // console.log(raw);

        fetch('https://crudclinics.herokuapp.com/listPersons/ins', {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
          mode: 'cors',
        })
          .then((response) => {
            response.text();
            // console.log(response.text());
            // console.log(response);
            if (response.status == 401) {
              alert('Erro: uma conta já está vinculada com este CPF!');
              return;
            }
            alert('Cadastrado com sucesso!');
          })

          .then((result) => {
            /*console.log(result)*/
          })
          .catch((error) => console.log('error', error));
      }
    }
  }

  public undoFormatAnyCpf(strCPF: string): string {
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
    var strCPF = this.undoFormatAnyCpf(this.dataForm.cpf);
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

  public setMaskCPF() {
    var cpf = this.dataForm.cpf;
    var num = cpf.replace(/[^\d]/g, ''); //remove all characters non numerics
    var len = num.length; //save the length of the num

    if (len <= 6) {
      cpf = num.replace(/(\d{3})(\d{1,3})/g, '$1.$2');
    } else if (len <= 9) {
      cpf = num.replace(/(\d{3})(\d{3})(\d{1,3})/g, '$1.$2.$3');
    } else {
      cpf = num.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/g, '$1.$2.$3-$4');
    }

    if ((len = 15 || len == 16)) cpf = cpf.substring(0, 14);

    this.dataForm.cpf = cpf;
  }

  public setMaskCEP() {
    var cep = this.dataForm.cep;
    var num = cep.replace(/[^\d]/g, ''); //remove all characters non numerics
    cep = num.replace(/(\d{5})(\d{1,3})/g, '$1-$2');
    if (cep.length == 10) cep = cep.substring(0, cep.length - 1);
    this.dataForm.cep = cep;
  }

  public setMaskCRM() {
    var crm = this.dataForm.crm;
    crm = crm.replace('/', '');

    var numPart = crm.substring(0, 6).replace(/\s+/g, '').replace(/[^\d]/g, '');

    var lettersPart = crm
      .toUpperCase()
      .substring(4, 8)
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/gi, '');

    if (numPart.length == 4) {
      var numPart = crm
        .substring(0, 4)
        .replace(/\s+/g, '')
        .replace(/[^\d]/g, '');

      var lettersPart = crm
        .toUpperCase()
        .substring(4, 6)
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9]/gi, '');

      crm = numPart.replace(/ ([0-9]{1,4}) /g, '$1');
      if (lettersPart.toUpperCase() != '') {
        crm += `/` + lettersPart.toUpperCase().replace(/[0-9]/g, '');
      }

      this.dataForm.crm = crm;
      return;
    } else if (numPart.length == 5) {
      var numPart = crm
        .substring(0, 5)
        .replace(/\s+/g, '')
        .replace(/[^\d]/g, '');

      var lettersPart = crm
        .toUpperCase()
        .substring(4, 7)
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9]/gi, '');

      crm = numPart.replace(/ ([0-9]{1,5}) /g, '$1');
      if (lettersPart.toUpperCase() != '') {
        crm += `/` + lettersPart.toUpperCase().replace(/[0-9]/g, '');
      }

      this.dataForm.crm = crm;
      return;
    } else {
      numPart = crm.substring(0, 6).replace(/\s+/g, '').replace(/[^\d]/g, '');

      lettersPart = crm
        .substring(6, 8)
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9]/gi, '');

      crm = numPart.replace(/ ([0-9]{1,6}) /g, '$1');
      if (lettersPart.toUpperCase() != '') {
        crm += `/` + lettersPart.toUpperCase().replace(/[0-9]/g, '');
      }

      //verify if has only the second part
      if (crm.length < 4 && crm.indexOf(`/`) == 0) this.dataForm.crm = '';
      else this.dataForm.crm = crm;
    }
  }

  public setMaskNumbersLettersHyphen(str: string) {
    var input = document.getElementById(str) as HTMLInputElement;
    // input.value = this.uppercaseFirstLetter(input.value);
    input.value = input.value.replace(
      /[^a-zA-ZâãàáéèêẽîĩìíôõóòũûúùÂÃÀÁÉÈÊẼÎĨÌÍÔÕÓÒŨÛÚÙ 0-9]/gi,
      ''
    );
  }
}
