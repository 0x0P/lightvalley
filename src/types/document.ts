export interface Document {
  version: number;
  type: documentTypes;
  author: string;
  name: string;
  identifier: string;
  displayname: string;
  content: string;
  time: Date;
  read: number;
  edit: number;
}

export enum documentTypes {
  DOCUMENT = "DOCUMENT",
  FILE = "FILE",
  CATEGORY = "CATEGORY",
  SYSTEM = "SYSTEM",
  TEMPLATE = "TEMPLATE",
}
