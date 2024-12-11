import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputSearchComponent,
      multi: true,
    },
  ],
})
export class InputSearchComponent implements ControlValueAccessor {
  @Input()
  placeholder: string = null;

  @ViewChild('input', { static: true })
  input: ElementRef<HTMLInputElement>;

  /** Методы ControlValueAccessor */
  onChange: (value: string) => void = () => null;
  onTouched: () => void = () => null;

  writeValue(value: string): void {
    this.input.nativeElement.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  /** end */

  changeHandler(value: string): void {
    this.onChange(value);
  }
}
