import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const cars = pgTable('cars', {
  id: serial('id').primaryKey(),
  make: text('make').notNull(),
  model: text('model').notNull(),
  year: text('year').notNull(),
  userId: serial('user_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const inspections = pgTable('inspections', {
  id: serial('id').primaryKey(),
  carId: serial('car_id').references(() => cars.id),
  userId: serial('user_id').references(() => users.id),
  report: text('report').notNull(),
  images: text('images').array(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
