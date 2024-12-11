import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FwbReportModel } from '../../models/fwbReports.model';

@Component({
  selector: '[app-test-table-item]',
  templateUrl: './test-table-item.component.html',
  styleUrl: './test-table-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestTableItemComponent {
  @Input({ required: true })
  item: FwbReportModel;
}
