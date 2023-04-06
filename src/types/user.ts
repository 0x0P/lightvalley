interface User {
  name: string;
  password: string;
  salt: string;
  time: Date;
  permissions: number;
}
