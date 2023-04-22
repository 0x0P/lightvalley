import { db } from "../global";
import { User } from "../types/user";

export const checkPermission = async (
  id: number,
  requirePermission: number
) => {
  const user: User = await db("users").select().where("id", id).first();
  return user.permission <= requirePermission;
};
