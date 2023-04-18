import { documentTypes } from "./document";
import { Request } from "express";

export interface createDocumentReqBody {
  name: string;
  displayName: string;
  content: string;
  type: documentTypes;
}

export interface authReqbody {
  name: string;
  tag: number;
  pw: string;
}

declare module "express" {
  export interface Request {
    user?: any;
  }
}
