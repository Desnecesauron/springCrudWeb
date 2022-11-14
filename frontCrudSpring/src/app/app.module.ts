import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { HeaderAppComponent } from './header-app/header-app.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent,
    HeaderAppComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    this.varColors();
  }

  private varColors() {
    // document.body.style.setProperty('--cor-um', '#E0E0E0');
    document.body.style.setProperty('--cor-um', '#f4f9f7');
    document.body.style.setProperty('--cor-texts', '#343a40');
    // document.body.style.setProperty('--cor-background-inputs', '#294852');
    document.body.style.setProperty('--cor-background-inputs', '#80b09e');
    document.body.style.setProperty('--cor-inputs-active', '#80b09e80');
    document.body.style.setProperty('--cor-inputs-disabled', '#5c4c57d1');
    document.body.style.setProperty('--cor-btns', '#FFF');

    document.body.style.setProperty('--visible-login', 'none');
    document.body.style.setProperty('--visible-register', 'none');
    document.body.style.setProperty('--visible-modal', 'none');
    document.body.style.setProperty('--visible-homePage', 'flex');
  }
}
