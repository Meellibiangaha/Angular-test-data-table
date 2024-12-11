import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { OrderByEnum } from '../../../../core/enums/order-by.enum';

@Component({
  selector: '[app-test-table-title]',
  templateUrl: './test-table-title.component.html',
  styleUrl: './test-table-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestTableTitleComponent {
  readonly order = signal<OrderByEnum>(null);

  @Input({ required: true })
  column: string;

  @Output()
  orderChange: EventEmitter<{ column: string; orderBy: OrderByEnum }> = new EventEmitter<{
    column: string;
    orderBy: OrderByEnum;
  }>();

  sortTableByColumn(): void {
    switch (this.order()) {
      case OrderByEnum.Asc:
        this.order.set(OrderByEnum.Desc);
        break;
      case OrderByEnum.Desc:
        this.order.set(null);
        break;
      default:
        this.order.set(OrderByEnum.Asc);
        break;
    }
    this.orderChange.emit({ column: this.column, orderBy: this.order() });
  }
}
