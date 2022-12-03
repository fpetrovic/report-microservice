export interface ReportSelectableFieldOption {
  "@id"?: string;
  name?: string;
  isSelected?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  readonly deleted?: boolean;
}
