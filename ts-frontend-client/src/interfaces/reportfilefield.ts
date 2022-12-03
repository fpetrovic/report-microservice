export interface ReportFileField {
  "@id"?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  name?: string;
  reportFieldType?: string;
  section?: string;
  sortOrder?: number;
  readonly deleted?: boolean;
}
