import {ReportFilterField} from "../interfaces/reportfilterfield";
import {ReportSelectableField} from "../interfaces/reportselectablefield";
import {ReportBasicField} from "../interfaces/reportbasicfield";

export type ReportFieldUnionType = ReportBasicField | ReportFilterField | ReportSelectableField
export type FilterUnionType = RecordImportFilter | DashboardImportFilter
export interface RecordImportFilter {
    type: string,
    status: string,
    priorities: {id: string, value: string}[],
    categories: {id: string, value: string}[],
    locations: {id: string, value: string}[],
}

export interface DashboardImportFilter {
  type: string,
  category: string,
  categoryGroups: {id: string, value: string}[]
  isShowCategoriesWithNoIssues: boolean

  status: string
}
