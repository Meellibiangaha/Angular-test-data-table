import { FormControl, FormGroup } from '@angular/forms';
import { OrderByEnum } from '../../../core/enums/order-by.enum';
import { DateRange, DateRangeForm } from '../../../core/models/date-range';
import { FwbDetails } from '../models/fwbReports.model';

export type FwbTableForm = {
  range: FormGroup<DateRangeForm>;
  sortName: FormControl<string>;
  sortBy: FormControl<keyof FwbDetails>;
  sortDesc: FormControl<OrderByEnum>;
};

export type FwbTableFormModel = {
  range: Partial<DateRange>;
  sortName: string;
  sortBy: keyof FwbDetails;
  sortDesc: OrderByEnum;
};
