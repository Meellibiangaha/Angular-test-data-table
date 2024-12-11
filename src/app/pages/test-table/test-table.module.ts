import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestTableComponent } from './test-table.component';
import { RouterModule, Routes } from '@angular/router';
import { testTableResolver } from './test-table.resolver';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TabButtonComponent } from '../../shared/components/tab-button/tab-button.component';
import { TestTableItemComponent } from './components/test-table-item/test-table-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSearchComponent } from '../../shared/components/input-search/input-search.component';
import { DatapickerComponent } from '../../shared/components/datapicker/datapicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TestTableItemExpandedComponent } from './components/test-table-item-expanded/test-table-item-expanded.component';
import { TestTableTitleComponent } from './components/test-table-title/test-table-title.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CollapseableSlideComponent } from '../../shared/components/collapseable-block/collapseable-slide.component';
import { CardItemDetailComponent } from './components/test-table-card-item-detail/card-item-detail.component';
import { TestTableCardPreviewComponent } from './components/test-table-card-preview/test-table-card-preview.component';

const routes: Routes = [
  {
    path: '',
    component: TestTableComponent,
    title: 'FWB таблица',
    resolve: { testTable: testTableResolver },
  },
];

@NgModule({
  declarations: [
    TestTableComponent,
    TestTableItemComponent,
    TestTableItemExpandedComponent,
    TestTableTitleComponent,
    CardItemDetailComponent,
    TestTableCardPreviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    TabButtonComponent,
    InputSearchComponent,
    CollapseableSlideComponent,
    DatapickerComponent,
    MatFormFieldModule,
    MatDatepickerModule,
    DragDropModule,
  ],
})
export class TestTableModule {}
