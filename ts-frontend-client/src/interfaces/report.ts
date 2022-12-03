export interface Report {
  "@id"?: string;

  id?: string
  config?: string;
  name?: string;
  isArchived?: boolean;
  sections?: any;
  readonly publishedAt?: Date;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
