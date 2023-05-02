import { db } from "../global";
import { User } from "../types/user";

export const checkPermission = async (
  id: number,
  requirePermission: number
) => {
  const user: User = (await db("users").select().where("id", id).first()) || {
    permission: 3,
  };
  return user.permission <= requirePermission;
};
