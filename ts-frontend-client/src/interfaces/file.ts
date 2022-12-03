export interface File {
  "@id"?: string;
  type?: string;
  storageKeyOriginal?: string;
  storageKey?: string;
  storageKeyThumbnail?: string;
  originalFilename?: string;
  uploadDevice?: string;
  isArchived?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  readonly archived?: boolean;
  readonly deleted?: boolean;
}
