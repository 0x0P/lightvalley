export interface Document {
  version: number;
  type: types;
  name: string;
  displayName: string;
  content: string;
  read: number;
  edit: number;
}

export enum types {
  DOCUMENT = "DOCUMENT",
  FILE = "FILE",
  CATEGORY = "CATEGORY",
  SYSTEM = "SYSTEM",
  TAMPLATE = "TAMPLATE",
}
