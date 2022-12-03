export interface ReportBasicField {
  "@id"?: string;
  textValue?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  name?: string;
  reportFieldType?: string;
  section?: string;
  sortOrder?: number;
  readonly deleted?: boolean;
}
