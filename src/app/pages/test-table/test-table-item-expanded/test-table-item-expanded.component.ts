import { ChangeDetectionStrategy, Component, computed, Input, signal } from '@angular/core';
import { FwbReportModel } from '../models/fwbReports.model';
import { SlideToggleAnimation } from '../../../core/animations/slide-toggle.animation';

@Component({
  selector: '[app-test-table-item-expanded]',
  templateUrl: './test-table-item-expanded.component.html',
  styleUrl: './test-table-item-expanded.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SlideToggleAnimation],
})
export class TestTableItemExpandedComponent {
  @Input({ required: true })
  item: FwbReportModel;

  @Input({ required: true })
  set isExpanded(value: boolean) {
    this.isToggle.set(value);
  }

  readonly isToggle = signal<boolean>(false);
  readonly opened = signal<boolean>(false);
  readonly slideProccess = signal<boolean>(false);
  readonly state = computed(() => (this.isToggle() ? 'expanded' : 'collapsed'));

  updateOpenedState(): void {
    this.opened.set(this.isToggle());
    this.slideProccess.set(false);
  }
  updateProcessState(): void {
    this.slideProccess.set(true);
  }

  destructureObj<T>(obj: T): { key: string; value: T }[] {
    if (!obj) return null;
    return Object.entries(obj)
      .filter(([key, value]) => !!value)
      .map(([key, value]) => ({ key, value }));
  }
}
