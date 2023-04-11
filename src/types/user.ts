export interface User {
  name: string;
  tag: number;
  identifier: string;
  password: string;
  salt: string;
  time: Date;
  permission: permission;
}

export enum permission {
  admin = 1,
  user = 2,
  guest = 3,
  block = 4,
}
