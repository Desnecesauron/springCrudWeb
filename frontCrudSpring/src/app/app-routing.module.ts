import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from './guards/can-activate.guard';

import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'index',
    //guards e tal
    component: IndexComponent,
    // canLoad: [CanLoadAppGuard],
    canActivate: [CanActivateGuard],
    // redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
