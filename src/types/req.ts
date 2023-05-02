import { documentTypes } from "./document";
import { Request } from "express";

export interface createDocumentReqBody {
  name: string;
  displayName: string;
  content: string;
  type: documentTypes;
  time: Date;
  read?: number;
  edit?: number;
}

export interface editDocumentReqBody {
  name: string;
  type: documentTypes;
  displayName?: string;
  content?: string;
  read?: number;
  edit?: number;
}

export interface deleteDocumentReqBody {
  name: string;
}

export interface authReqbody {
  name: string;
  tag: number;
  pw: string;
}

export interface ReqUser {
  id?: number;
  name: string;
  tag: number | string;
  identifier: string;
}

declare module "express" {
  export interface Request {
    user?: any;
  }
}
