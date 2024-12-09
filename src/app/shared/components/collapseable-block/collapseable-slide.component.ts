import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  signal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SlideToggleAnimation } from '../../../core/animations/slide-toggle.animation';

@Component({
  selector: 'app-collapseable-slide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collapseable-slide.component.html',
  styleUrl: './collapseable-slide.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [SlideToggleAnimation],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CollapseableSlideComponent),
      multi: true,
    },
  ],
})
export class CollapseableSlideComponent {
  @Input()
  set checked(checked: boolean) {
    this.isChecked.set(checked);
  }
  @Input('disabled')
  set disable(value: boolean) {
    this.disabled.set(value);
  }
  @Input({ required: true })
  set titleText(title: string) {
    this.title.set(title);
  }

  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-native
  toggleSlide = new EventEmitter<boolean>(false);

  readonly title = signal<string>(null);
  readonly disabled = signal<boolean>(false);
  readonly isChecked = signal<boolean>(false);
  readonly opened = signal<boolean>(false);
  readonly slideProccess = signal<boolean>(false);
  readonly state = computed(() => (this.isChecked() ? 'expanded' : 'collapsed'));

  onChange: (value: boolean) => void = () => null;
  onTouched: () => void = () => null;

  toggle() {
    if (!this.disabled()) {
      this.onTouched();
      this.isChecked.set(!this.isChecked());
      this.onChange(this.isChecked());
      this.toggleSlide.emit(this.isChecked());
    }
  }

  writeValue(value: boolean): void {
    this.isChecked.set(value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  updateOpenedState(): void {
    this.opened.set(this.isChecked());
    this.slideProccess.set(false);
  }
  updateProcessState(): void {
    this.slideProccess.set(true);
  }
}
