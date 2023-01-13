import { PrismaClient } from '@prisma/client';

let db;

// Check if we are in production mode
if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();
} else {
  // Check if we already have a db connection
  if (!global.db) {
    global.db = new PrismaClient();
  }
  db = global.db;
}

export { db };
