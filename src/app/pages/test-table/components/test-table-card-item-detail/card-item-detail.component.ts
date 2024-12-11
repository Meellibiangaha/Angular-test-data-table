import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FwbReportModel } from '../../models/fwbReports.model';
import { destructureObj } from '../../../../core/helpers/destructure-obj';

@Component({
  selector: 'app-test-table-card-item-detail',
  templateUrl: './card-item-detail.component.html',
  styleUrl: './card-item-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardItemDetailComponent {
  @Input({ required: true })
  itemCard: FwbReportModel;

  @Output()
  removeCard: EventEmitter<number> = new EventEmitter<number>();

  destructureObj<T>(obj: T): { key: string; value: T }[] {
    return destructureObj(obj);
  }
}
