import "dotenv/config";
// import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

// const connectionString = `file:./dev.db`;
// const adapter = new PrismaBetterSqlite3({ url: connectionString });
// export const prisma = new PrismaClient({ adapter });

// Trigger reload
import { PrismaNeon } from "@prisma/adapter-neon";
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
export const prisma = new PrismaClient({ adapter });
