import { db } from "../index.js";
import { roles } from "../schema/roles.js";

export const rolesSeed = async () => {
  await db.insert(roles).values([
    {
      name: "lecturer",
      description: "Dosen",
    },
    {
      name: "student",
      description: "Mahasiswa",
    },
  ]);
};
