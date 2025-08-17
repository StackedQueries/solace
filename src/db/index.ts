import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setup = () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    return {
      select: () => ({
        from: () => [],
      }),
    };
  }

  // for query purposes with connection pooling
  const queryClient = postgres(process.env.DATABASE_URL, {
    max: 10, // maximum number of connections
    idle_timeout: 20, // close idle connections after 20 seconds
    connect_timeout: 10, // connection timeout
  });
  const db = drizzle(queryClient);
  return db;
};

export default setup();
