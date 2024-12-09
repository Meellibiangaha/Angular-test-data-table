import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateRange } from '../../../core/models/date-range';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-datapicker',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule],
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
  /** Чтобы реализовать задержку перед onChange */
  private inputSubject = new Subject<string>();

  onChange: (value: string) => void = () => null;
  onTouched: () => void = () => null;
  writeValue(value: string): void {}
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  changeHandler(dateInput: MatDatepickerInputEvent<any, any>): void {
    const dateISO = new Date(dateInput.value).toISOString();

    this.inputSubject.next(dateISO);
  }
  ngOnInit(): void {
    this.inputSubject.pipe(debounceTime(400)).subscribe((value) => {
      this.onChange(value);
    });
  }
}
