import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

declare global {
  var __prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (process.env.VERCEL === "1" && !connectionString) {
  throw new Error("DATABASE_URL is required in Vercel deployments.");
}

const adapter = new PrismaPg({
  connectionString: connectionString ?? "postgresql://postgres:postgres@localhost:5432/teragenix",
});

export const prisma =
  global.__prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

export type DbTransactionClient = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$use" | "$extends"
>;

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}
