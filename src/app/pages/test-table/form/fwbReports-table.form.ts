import { FormControl, FormGroup } from '@angular/forms';
import { OrderByEnum } from '../../../core/enums/order-by.enum';
import { DateRange, DateRangeForm } from '../../../core/models/date-range';
import { FwbDetails } from '../models/fwbReports.model';

export type FwbTableForm = {
  range: FormGroup<DateRangeForm>;
  searchTerm: FormControl<string>;
  sortName: FormControl<string>;
  sortBy: FormControl<keyof FwbDetails>;
  sortDesc: FormControl<OrderByEnum>;
};

export type FwbTableFormModel = {
  range: Partial<DateRange>;
  searchTerm: string;
  sortName: string;
  sortBy: keyof FwbDetails;
  sortDesc: OrderByEnum;
};
