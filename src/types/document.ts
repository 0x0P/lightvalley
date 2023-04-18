export interface Document {
  version: number;
  type: documentTypes;
  author: string;
  name: string;
  displayname: string;
  content: string;
  read: number;
  edit: number;
}

export enum documentTypes {
  DOCUMENT = "DOCUMENT",
  FILE = "FILE",
  CATEGORY = "CATEGORY",
  SYSTEM = "SYSTEM",
  TAMPLATE = "TAMPLATE",
}
