import {ReportField} from "./reportfield";

export interface ReportSection {
  "@id"?: string;
  name?: string;
  report?: any;
  reportFields?: ReportField[];
  position?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  readonly deleted?: boolean;
}
