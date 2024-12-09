import { FormControl } from '@angular/forms';
import { OrderByEnum } from '../../../core/enums/order-by.enum';
import { DateRange } from '../../../core/models/date-range';
import { FwbDetails } from '../models/fwbReports.model';

export type FwbTableForm = {
  range: FormControl<DateRange>;
  sortName: FormControl<string>;
  sortBy: FormControl<keyof FwbDetails>;
  sortDesc: FormControl<OrderByEnum>;
};

export type FwbTableFormModel = {
  range: DateRange;
  sortName: string;
  sortBy: keyof FwbDetails;
  sortDesc: OrderByEnum;
};
