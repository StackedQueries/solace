import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  bigint,
  primaryKey,
} from "drizzle-orm/pg-core";

const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: text("degree").notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

const specialties = pgTable("specialties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

const advocates_specialties = pgTable(
  "advocates_specialties",
  {
    advocateId: integer("advocate_id").references(() => advocates.id),
    specialtyId: integer("specialty_id").references(() => specialties.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.advocateId, table.specialtyId] }),
  })
);

export { advocates, specialties, advocates_specialties };
