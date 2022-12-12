import { inferAsyncReturnType } from "@trpc/server";
import { prisma } from "../utils/prisma";

export function createContext() {
  return {
    prisma,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
