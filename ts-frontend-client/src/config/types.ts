import {ReportFilterField} from "../interfaces/reportfilterfield";
import {ReportSelectableField} from "../interfaces/reportselectablefield";
import {ReportBasicField} from "../interfaces/reportbasicfield";

export type ReportFieldUnionType = ReportBasicField | ReportFilterField | ReportSelectableField
export type FilterUnionType = RecordImportFilter | DashboardImportFilter
export interface RecordImportFilter {
    type: string,
    status: string,
    priorities: {id: string, name: string}[],
    categories: {id: string, name: string}[],
    locations: {id: string, name: string}[]
}

export interface DashboardImportFilter {
  type: string,
  category: string,
  categoryGroups: {id: string, name: string}[]
  isShowCategoriesWithNoIssues: boolean

  status: string
}
