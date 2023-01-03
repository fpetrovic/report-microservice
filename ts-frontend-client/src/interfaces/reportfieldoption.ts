export interface ReportFieldOption {
  "@id"?: string;
  name?: string;
  reportField?: string;
  isSelected?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  position?: number;
  readonly deleted?: boolean;
}
