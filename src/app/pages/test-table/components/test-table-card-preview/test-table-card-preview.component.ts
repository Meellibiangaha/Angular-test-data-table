import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FwbReportModel } from '../../models/fwbReports.model';

@Component({
  selector: 'app-test-table-card-preview',
  templateUrl: './test-table-card-preview.component.html',
  styleUrl: './test-table-card-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestTableCardPreviewComponent {
  @Input({ required: true })
  item: FwbReportModel;
}
