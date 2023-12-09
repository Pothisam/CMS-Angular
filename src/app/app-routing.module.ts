import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"CMS",
    loadChildren:()=> import('./Area/CMS/Shared/Layout/CMS.module').then(x => x.CMSModule)
  },
  {
    path:"Staff",
    loadChildren:()=> import('./Area/Staff/Shared/Staff.module').then(x => x.StaffModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
