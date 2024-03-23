import type { Config } from "drizzle-kit";

export default {
	schema: "./src/lib/db/schema.ts",
	out: "./src/lib/db/migrations",
	breakpoints: true,
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.DATABASE_URL as string,
	},
} satisfies Config;
