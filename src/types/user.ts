export interface User {
  id?: number;
  name: string;
  tag: number | string;
  identifier: string;
  password: string;
  time: Date;
  permission: permission;
}

export enum permission {
  owner = 0,
  admin = 1,
  user = 2,
  guest = 3,
  block = 4,
}
