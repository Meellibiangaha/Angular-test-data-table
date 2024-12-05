import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { TabButtonComponent } from '../../shared/tab-button/tab-button.component';
import { CollapseableSlideComponent } from '../../shared/collapseable-block/collapseable-slide.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Главная',
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TabButtonComponent, CollapseableSlideComponent],
})
export class HomeModule {}
