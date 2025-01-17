import { PrismaClient } from "@prisma/client";

// Declare a global PrismaClient to avoid multiple instances in development
declare global {
  // Use var to declare prisma on the globalThis object
  var prisma: PrismaClient | undefined;
}

// Create or reuse a PrismaClient instance
export const db = globalThis.prisma || new PrismaClient();

// Cache the instance in development to prevent creating multiple connections
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
