import { eq } from "drizzle-orm";

import { hashPassword } from "../../utils/password.js";
import { db } from "../index.js";
import { lecturers } from "../schema/lecturers.js";
import { roles } from "../schema/roles.js";
import { users } from "../schema/users.js";

// Development-only password for seeded accounts. Never use in production.
const seedPassword = "password123";

const lecturerSeeds = [
  {
    fullName: "Dr. Andi Pratama",
    nidn: "1234567890",
    email: "andi.pratama@example.com",
    username: "andi_pratama",
  },
  {
    fullName: "Dr. Siti Rahmawati",
    nidn: "0987654321",
    email: "siti.rahmawati@example.com",
    username: "siti_rahmawati",
  },
];

const findLecturerRoleId = async () => {
  const [role] = await db
    .select({ id: roles.id })
    .from(roles)
    .where(eq(roles.name, "lecturer"))
    .limit(1);

  if (!role) {
    throw new Error('Role "lecturer" not found. Run the roles seed first.');
  }

  return role.id;
};

const createUser = async (
  roleId: number,
  lecturer: (typeof lecturerSeeds)[number],
) => {
  const hashedPassword = await hashPassword(seedPassword);

  const result = await db.insert(users).values({
    name: lecturer.fullName,
    username: lecturer.username,
    email: lecturer.email,
    password: hashedPassword,
    roleId,
  });

  return result[0].insertId;
};

export const lecturersSeed = async () => {
  const roleId = await findLecturerRoleId();

  for (const lecturer of lecturerSeeds) {
    const [existingUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, lecturer.email))
      .limit(1);

    const userId = existingUser?.id ?? (await createUser(roleId, lecturer));

    const [existingProfile] = await db
      .select({ id: lecturers.id })
      .from(lecturers)
      .where(eq(lecturers.userId, userId))
      .limit(1);

    if (existingProfile) {
      continue;
    }

    await db.insert(lecturers).values({
      userId,
      fullName: lecturer.fullName,
      nidn: lecturer.nidn,
    });
  }
};
