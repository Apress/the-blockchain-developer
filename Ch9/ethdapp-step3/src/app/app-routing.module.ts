import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { TransferComponent } from './components/transfer/transfer.component';
const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartComponent },
  { path: 'transfer', component: TransferComponent }
];
@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes), CommonModule ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
