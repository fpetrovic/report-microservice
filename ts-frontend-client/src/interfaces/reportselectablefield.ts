export interface ReportSelectableField {
  "@id"?: string;
  reportSelectableFieldOptions?: any;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  name?: string;
  reportFieldType?: string;
  section?: string;
  position?: number;
  readonly deleted?: boolean;
}
