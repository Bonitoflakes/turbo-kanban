import { relations } from "drizzle-orm/relations";
import { columns, cards } from "./schema";

export const cardsRelations = relations(cards, ({one}) => ({
	column: one(columns, {
		fields: [cards.columnId],
		references: [columns.id]
	}),
}));

export const columnsRelations = relations(columns, ({many}) => ({
	cards: many(cards),
}));