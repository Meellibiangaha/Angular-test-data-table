import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestTableComponent } from './test-table.component';
import { RouterModule, Routes } from '@angular/router';
import { testTableResolver } from './test-table.resolver';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TabButtonComponent } from '../../shared/components/tab-button/tab-button.component';
import { TestTableItemComponent } from './test-table-item/test-table-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollableContainerDirective } from '../../shared/directives/scrollable-container.directive';
import { InputSearchComponent } from '../../shared/components/input-search/input-search.component';
import { DatapickerComponent } from '../../shared/components/datapicker/datapicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TestTableItemExpandedComponent } from './test-table-item-expanded/test-table-item-expanded.component';

const routes: Routes = [
  {
    path: '',
    component: TestTableComponent,
    title: 'FWB таблица',
    resolve: { testTable: testTableResolver },
  },
];

@NgModule({
  declarations: [TestTableComponent, TestTableItemComponent, TestTableItemExpandedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    TabButtonComponent,
    ScrollableContainerDirective,
    InputSearchComponent,
    DatapickerComponent,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
})
export class TestTableModule {}
