import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AppoinmenthistoryPage } from './appoinmenthistory.page';

const routes: Routes = [
  {
    path: '',
    component: AppoinmenthistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AppoinmenthistoryPage]
})
export class AppoinmenthistoryPageModule {}
