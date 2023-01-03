export interface ReportFileField {
  "@id"?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  name?: string;
  reportFieldType?: string;
  section?: string;
  position?: number;
  readonly deleted?: boolean;
}
