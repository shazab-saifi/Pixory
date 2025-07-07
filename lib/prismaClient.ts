import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (!global.prisma) {
  global.prisma = new PrismaClient({
    log: ["info"],
  });
}
prisma = global.prisma;

export default prisma;
