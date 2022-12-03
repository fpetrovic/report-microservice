import {DashboardImportFilter, RecordImportFilter} from "../config/types";

export interface ReportFilterField {
  "@id"?: string;
  filter?: RecordImportFilter|DashboardImportFilter;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  name?: string;
  reportFieldType?: string;
  section?: string;
  sortOrder?: number;
  readonly deleted?: boolean;
}
