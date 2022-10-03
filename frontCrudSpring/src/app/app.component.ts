import { Component } from '@angular/core';

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
    if(!(this.nameVerify()))
    {
      return;
    }


    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:8080/listEvents")
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));


    return;
  }

  public formatCpf()
  {
    const input = document.getElementById('CpfText') as HTMLInputElement | null;
    const value = input?.value;

    if(value=="")
    {
      return;
    }

    let valorFormatado = value + '';

    if(valorFormatado.includes("."))
    {
      valorFormatado =  valorFormatado.replace(".","");
      valorFormatado =  valorFormatado.replace("-","");
      valorFormatado+="0";
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
    if(valorFormatado.includes("."))
    {
      valorFormatado =  valorFormatado.replace(".","");
      valorFormatado =  valorFormatado.replace(".","");
      valorFormatado =  valorFormatado.replace(".","");
      valorFormatado =  valorFormatado.replace("-","");
      valorFormatado =  valorFormatado.replace("-","");
    }
    value = valorFormatado;

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

  public nameVerify():boolean
  {
    const me = document.getElementById('NameText') as HTMLInputElement | null;
    var broke = false;

    if(me?.value=="")
    {
      return true;
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


}


