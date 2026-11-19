import { db } from "../index.js";
import { users } from "../schema/users.js";

export const usersSeed = async () => {
  await db.insert(users).values([
    {
      name: "John",
      username: "jhon30",
      email: "john@example.com",
      roleId: 1,
      password: "1234567890",
    },
    {
      name: "Jane",
      username: "jhane11",
      email: "jane@example.com",
      roleId: 1,
      password: "1234567890",
    },
  ]);
};
