import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule) },
  {
    path: 'fwb-table',
    loadChildren: () => import('./pages/test-table/test-table.module').then((m) => m.TestTableModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
