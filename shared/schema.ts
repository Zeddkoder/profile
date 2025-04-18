import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  linkedin: text("linkedin"),
  domain: text("domain").notNull(),
  otherDomain: text("other_domain"),
  jobTitle: text("job_title").notNull(),
  experience: text("experience").notNull(),
  tools: text("tools").notNull(),
  projectTypes: text("project_types").notNull(),
  otherProject: text("other_project"),
  specialization: text("specialization"),
  portfolio: text("portfolio"),
  interests: text("interests"),
  needs: text("needs"),
  desires: text("desires"),
  photoUrl: text("photo_url"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Nom et prénom sont requis" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string().min(5, { message: "Numéro de téléphone invalide" }),
  linkedin: z.string().url().optional().or(z.literal("")),
  domain: z.string().min(1, { message: "Domaine requis" }),
  otherDomain: z.string().optional(),
  jobTitle: z.string().min(1, { message: "Titre de poste requis" }),
  experience: z.string().min(1, { message: "Expérience requise" }),
  tools: z.string().min(1, { message: "Outils ou technologies requis" }),
  projectTypes: z.array(z.string()).min(1, { message: "Au moins un type de projet est requis" }),
  otherProject: z.string().optional(),
  specialization: z.string().optional(),
  portfolio: z.string().url().optional().or(z.literal("")),
  interests: z.string().optional(),
  needs: z.string().optional(),
  desires: z.string().optional(),
  photoUrl: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type ProfileFormData = z.infer<typeof profileFormSchema>;
export type InsertProfile = typeof userProfiles.$inferInsert;
export type UserProfile = typeof userProfiles.$inferSelect;
