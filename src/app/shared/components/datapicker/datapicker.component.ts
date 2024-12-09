import { ChangeDetectionStrategy, Component, Input, OnInit, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, Subject } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { formatDateToDMY } from '../../../core/helpers/date-format';

@Component({
  selector: 'app-datapicker',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule, MatInputModule, MatNativeDateModule],
  templateUrl: './datapicker.component.html',
  styleUrl: './datapicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DatapickerComponent,
      multi: true,
    },
    provideNativeDateAdapter(),
  ],
})
export class DatapickerComponent implements ControlValueAccessor, OnInit {
  @Input()
  label: string = 'Выберите дату';

  /** Чтобы реализовать задержку перед onChange */
  private inputSubject = new Subject<string>();

  onChange: (value: string) => void = () => null;
  onTouched: () => void = () => null;

  /** Методы ControlValueAccessor */
  writeValue(value: string): void {}
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  /** end */

  changeHandler(dateInput: MatDatepickerInputEvent<any, any>): void {
    const dateISO = dateInput.value ? formatDateToDMY(new Date(dateInput.value)) : null;
    this.inputSubject.next(dateISO);
  }
  ngOnInit(): void {
    this.inputSubject.pipe(debounceTime(400)).subscribe((value) => {
      this.onChange(value);
    });
  }
}
