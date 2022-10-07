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

  public dataForm:{ nome:string, cpf:any, password:string} = {nome:"", cpf:"", password:""};

  public postLogin()
  {
    console.log(this.dataForm)

    if(!(this.nameVerify()))
    {
      return;
    }


    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://crudclinics.herokuapp.com/listPersons")
      .then(response => response.text())
      .then(result => console.log(result))
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


