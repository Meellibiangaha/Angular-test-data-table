import { FormControl } from '@angular/forms';

export type DateRange = {
  from: string;
  to: string;
};

export type DateRangeForm = {
  from: FormControl<string>;
  to: FormControl<string>;
};
