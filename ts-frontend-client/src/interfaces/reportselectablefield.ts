export interface ReportSelectableField {
  "@id"?: string;
  reportSelectableFieldOptions?: any;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  name?: string;
  reportFieldType?: string;
  section?: string;
  sortOrder?: number;
  readonly deleted?: boolean;
}
