import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-button.component.html',
  styleUrl: './tab-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabButtonComponent {
  @Input({ required: true })
  btnText: string = '';

  @Input()
  disabled = false;
}
