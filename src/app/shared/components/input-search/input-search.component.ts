import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

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
export class InputSearchComponent implements ControlValueAccessor, OnInit {
  @Input()
  placeholder: string = null;

  @ViewChild('input', { static: true })
  input: ElementRef<HTMLInputElement>;

  /** Чтобы реализовать задержку перед onChange */
  private inputSubject = new Subject<string>();

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
    this.inputSubject.next(value);
  }

  ngOnInit(): void {
    this.inputSubject.pipe(debounceTime(400)).subscribe((value) => {
      this.onChange(value);
    });
  }
}
