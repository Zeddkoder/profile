import { users, type User, type InsertUser, type UserProfile, type InsertProfile } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveProfile(profile: InsertProfile): Promise<UserProfile>;
  getProfile(id: number): Promise<UserProfile | undefined>;
  getAllProfiles(): Promise<UserProfile[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private profiles: Map<number, UserProfile>;
  private currentUserId: number;
  private currentProfileId: number;

  constructor() {
    this.users = new Map();
    this.profiles = new Map();
    this.currentUserId = 1;
    this.currentProfileId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveProfile(profile: InsertProfile): Promise<UserProfile> {
    const id = this.currentProfileId++;
    const userProfile: UserProfile = { ...profile, id };
    this.profiles.set(id, userProfile);
    return userProfile;
  }

  async getProfile(id: number): Promise<UserProfile | undefined> {
    return this.profiles.get(id);
  }

  async getAllProfiles(): Promise<UserProfile[]> {
    return Array.from(this.profiles.values());
  }
}

export const storage = new MemStorage();
