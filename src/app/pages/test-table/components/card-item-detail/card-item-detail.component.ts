import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FwbReportModel } from '../../models/fwbReports.model';

@Component({
  selector: 'app-card-item-detail',
  templateUrl: './card-item-detail.component.html',
  styleUrl: './card-item-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardItemDetailComponent {
  @Input({ required: true })
  cardItem: FwbReportModel;

  @Output()
  removeCard: EventEmitter<number> = new EventEmitter<number>();
}
