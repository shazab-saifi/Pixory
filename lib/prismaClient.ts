import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

if (!global.prisma) {
  global.prisma = new PrismaClient({
    log: ["info"],
  });
}

const prisma: PrismaClient = global.prisma;

export default prisma;
