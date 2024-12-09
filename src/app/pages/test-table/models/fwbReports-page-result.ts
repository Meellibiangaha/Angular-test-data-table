import { FwbReportModel } from './fwbReports.model';

export type FwbReportsPageResult = {
  fwb_data: FwbReportModel[];
  totalRecords: number;
}
