import { documentTypes } from "./document";

export type createDocumentReqBody = {
  name: string;
  displayName: string;
  content: string;
  type: documentTypes;
};

export type authReqbody = {
  name: string;
  tag: number;
  pw: string;
};
