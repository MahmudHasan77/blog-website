// lib/middleware/authMiddleware.ts
import { NextRequest } from "next/server";
import adminModel from "./adminModel";
import database from "./MongoDB";

export async function authMiddleware(request: NextRequest): Promise<boolean> {
  const session = request.cookies.get("session")?.value;
  if (!session) return false;

  await database();
  const adminUser = await adminModel.findOne({ sessionToken: session });
  if (!adminUser) return false;

  // Session expiry check
  const now = new Date();
  const sessionAge =
    now.getTime() - (adminUser.sessionCreatedAt?.getTime() || 0);
  if (sessionAge > 24 * 60 * 60 * 1000) {
    adminUser.sessionToken = null;
    adminUser.sessionCreatedAt = null;
    await adminUser.save();
    return false;
  }

  if (adminUser.role !== "admin") return false;

  return true; 
}
