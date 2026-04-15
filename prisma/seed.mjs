import { PrismaClient, UserRole, UserStatus } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required to seed the admin user.");
}

const passwordHash = await hash(password, 12);

await prisma.user.upsert({
  where: { email },
  update: {
    passwordHash,
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
  },
  create: {
    email,
    passwordHash,
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    firstName: "Teragenix",
    lastName: "Admin",
  },
});

await prisma.$disconnect();

console.log(`Seeded admin user: ${email}`);
