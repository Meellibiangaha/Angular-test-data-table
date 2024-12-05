import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestTableComponent } from './test-table.component';
import { RouterModule, Routes } from '@angular/router';
import { testTableResolver } from './test-table.resolver';

const routes: Routes = [
  {
    path: '',
    component: TestTableComponent,
    title: 'FWB таблица',
    resolve: { testTable: testTableResolver },
  },
];

@NgModule({
  declarations: [TestTableComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TestTableModule {}
