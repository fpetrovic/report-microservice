export interface ReportTemplate {
  "@id"?: string;

  id?: string
  description?: string;
  supportingText?: string;
  name?: string;
  isArchived?: boolean;
  sections?: any;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
