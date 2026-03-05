import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Extend the global object to include the PrismaClient instance
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = globalThis.prisma || new PrismaClient({ adapter });
// Ensure the PrismaClient instance is not recreated in development
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
