import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

// 1. Tworzymy adapter i klienta
const adapter = new PrismaNeon({ connectionString });
const baseClient = new PrismaClient({ adapter });

// 2. Rozszerzamy go (to tworzy nasz finalny typ)
const prismaClientExtended = baseClient.$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});

// 3. Definiujemy typ dla globala
type PrismaClientExtended = typeof prismaClientExtended;

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClientExtended | undefined;
}

// 4. Inicjalizacja Singletona - UPEWNIAMY SIĘ, ŻE TO OBIEKT, NIE FUNKCJA
const prisma = globalThis.prismaGlobal ?? prismaClientExtended;

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
