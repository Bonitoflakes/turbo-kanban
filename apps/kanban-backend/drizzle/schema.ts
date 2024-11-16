import { pgTable, bigserial, text, integer, timestamp, foreignKey, bigint, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const color = pgEnum("color", ['rose', 'yellow', 'red', 'purple', 'blue', 'green', 'orange', 'brown', 'gray'])


export const columns = pgTable("columns", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	title: text().notNull(),
	colorSpace: color().default('purple').notNull(),
	order: integer().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const cards = pgTable("cards", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	columnId: bigint("column_id", { mode: "number" }).notNull(),
	title: text().notNull(),
	description: text().notNull(),
	order: integer().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => {
	return {
		cardsColumnIdColumnsIdFk: foreignKey({
			columns: [table.columnId],
			foreignColumns: [columns.id],
			name: "cards_column_id_columns_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});
