import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const maps = pgTable("maps", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	image_url: text("image_url").notNull(),
});

export const characters = pgTable("characters", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	coordinates: integer("coordinates").array().notNull(),
	image_url: text("image_url").notNull(),
	map_id: integer("map_id")
		.references(() => maps.id)
		.notNull(),
});

export const leaderboards = pgTable("leaderboards", {
	id: serial("id").primaryKey(),
	username: text("username").notNull(),
	score: text("score").notNull(),
	map_id: integer("map_id")
		.references(() => maps.id)
		.notNull(),
});

export const leaderboardsRelations = relations(leaderboards, ({ one }) => ({
	map: one(maps, {
		fields: [leaderboards.map_id],
		references: [maps.id],
	}),
}));

export const mapsRelations = relations(maps, ({ many }) => ({
	characters: many(characters),
}));

export const charactersRelations = relations(characters, ({ one }) => ({
	map: one(maps, {
		fields: [characters.map_id],
		references: [maps.id],
	}),
}));
