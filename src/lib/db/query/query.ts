"use server";

import { and, count, desc, eq, ilike, like, sql } from "drizzle-orm";
import { db } from "../index";
import { records, users } from "../schema/auth";
import { use } from "react";

export const getUserInfo = async (userId: string) => {
  const response = await db.select().from(users).where(eq(users.id, userId));
  return response;
};

export const createRecords = async (data: any) => {
  const response = await db
    .insert(records)
    .values(data)
    .returning();
  return response;
}

export const getReocrdsOfUser = async(userId : string) => {
  const response = await db
    .select()
    .from(records)
    .where(eq(records.userId, userId))
    .orderBy(desc(records.createdAt));
  return response;
}