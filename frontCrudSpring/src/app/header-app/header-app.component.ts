import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataUser } from '../interfaces/data-user';
import { JwtServicesService } from '../services/jwt-services.service';

@Component({
  selector: 'app-header-app',
  templateUrl: './header-app.component.html',
  styleUrls: ['./header-app.component.css'],
})
export class HeaderAppComponent implements OnInit, AfterViewInit {
  constructor(public jwtServices: JwtServicesService) {}

  public dataValid: boolean = false;
  public hasCRM: boolean = false;
  public dataUser: DataUser | null = null;

  ngOnInit(): void {
    this.dataUser = this.jwtServices.decrypt('jsonUser');
    // console.log(this.dataUser);
    this.dataValid = true;

    this.hasCRM = this.dataUser?.crm == '' ? false : true;
  }

  ngAfterViewInit(): void {}
}
