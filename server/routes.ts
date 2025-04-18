import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { profileFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for profile management
  app.post("/api/profiles", async (req, res) => {
    try {
      const validatedData = profileFormSchema.parse(req.body);
      const result = await storage.saveProfile(validatedData);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Server error while saving profile" });
      }
    }
  });

  app.get("/api/profiles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid profile ID" });
      }

      const profile = await storage.getProfile(id);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ message: "Server error while retrieving profile" });
    }
  });

  app.get("/api/profiles", async (req, res) => {
    try {
      const profiles = await storage.getAllProfiles();
      res.status(200).json(profiles);
    } catch (error) {
      res.status(500).json({ message: "Server error while retrieving profiles" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
