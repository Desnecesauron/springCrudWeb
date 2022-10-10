import { Component } from '@angular/core';
import { __values } from 'tslib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent
{
  title = 'frontCrudSpring';

  public dataForm:{ nome:string, cpf:any} = {nome:"", cpf:""};

  public postLogin()
  {
    // console.log(this.dataForm)

    if(!(this.nameVerify()))
    {
      return;
    }

    if(!(this.TestaCPF()))
    {
      alert("Mó cota fazendo isso pra tu colocar CPF inválido :(")
      return;
    }

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://crudclinics.herokuapp.com/listPersons")
      .then(response => response.text())
      .then(result => console.log("Resultado:"+result))
      .catch(error => console.log('error', error));

    return;
  }

  public formatCpf()
  {
    const input = document.getElementById('CpfText') as HTMLInputElement | null;
    var value = input?.value;

    if(value=="" || value==null)
    {
      return;
    }
    
    if(value.trim()=="")
    {
      value = value.trim();
      this.dataForm.cpf= value;
      return;
    }

    let valorFormatado = value + '';

    do
    {
      if(valorFormatado.includes(".") || valorFormatado.includes("-"))
      {
        valorFormatado =  valorFormatado.replace(".","");
        valorFormatado =  valorFormatado.replace("-","");
      }
      else
      {
        break;
      }
    }while (true);

    if(!this.onlyNumbers(valorFormatado))
    {
      
      do
      {
        if(valorFormatado.length==0)
          break;
        if(!this.onlyNumbers(valorFormatado))
        {
          valorFormatado =  valorFormatado.substring(0, valorFormatado.length-1);
        }
        else
        {
          break;
        }
      }while (true);
      
      this.dataForm.cpf= valorFormatado;
      if(valorFormatado.length==0)
        return;
    }
    
    valorFormatado = valorFormatado
    .padStart(11, '0')                  // item 1
    .substring(0, 11)                      // item 2
    .replace(/[^0-9]/, '')              // item 3
    .replace(                           // item 4
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4'
    );
  
    this.dataForm.cpf=valorFormatado;  
    return valorFormatado;

  }

  public desformatCpf()
  {
    const input = document.getElementById('CpfText') as HTMLInputElement | null;
    var value = input?.value;

    if(value=="" || value==null)
    {
      return;
    }

    let valorFormatado = value + '';

    value = this.desformatAnyCpf(valorFormatado);

    var i=0;
    while (value[i])
    {
      if(value[i]!="0")
      {
        break;
      }
      else
      {
        i++;
      }
    }
    value = value.substring(i);
    valorFormatado = value;
    
    this.dataForm.cpf=valorFormatado;  
    return valorFormatado;
  }

  public desformatAnyCpf(strCPF:string):string
  {
    do
    {
      if(strCPF.includes(".") || strCPF.includes("-"))
      {
        strCPF =  strCPF.replace(".","");
        strCPF =  strCPF.replace("-","");
      }
      else
      {
        break;
      }
    }while (true);

    return strCPF;
  }


  public TestaCPF():boolean
  {
    var strCPF = this.desformatAnyCpf(this.dataForm.cpf);
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (var i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
  }



  public formatName()
  {
    const me = document.getElementById('NameText') as HTMLInputElement | null;

    if(me==null)
    {
      return;
    }

    if(me.value.startsWith(" "))
    {
      me.value = me.value.substring(1);
    }

    if(me.value.endsWith("  "))
    {
      me.value = me.value.substring(0, me.value.length-1)
    }

  }

  public nameVerify():boolean
  {
    const me = document.getElementById('NameText') as HTMLInputElement | null;
    
    if(me?.value.trim()=="" && me?.value.length==0)
    {
      return false;
    }

    if(me?.value.trim()=="" && me?.value.length>0)
    {
      alert("Existe apenas espaços no nome!!!")
      return false;
    }

    if(me?.value.endsWith(" "))
    {
      me.value = me.value.substring(0, me.value.length-1)
    }

    if(me==null)
    {
      return false;
    }

    if(!(this.onlyLetters(me.value)))
    {
      alert("Existe caracteres especiais no nome!!!")
    }
    else
    {
      return true;
    }

    return false;
  }

  public  onlyLetters(str:string):boolean {
    str = str.trim().toLowerCase();
    return /^[a-zA-Z\s]+$/.test(str);
  }

  public onlyNumbers(str:string):boolean {
    return /^[0-9]+$/.test(str);
  }

}


