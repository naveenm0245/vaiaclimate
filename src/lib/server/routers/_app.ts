import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { protectedRouter } from "./protected";

export const appRouter = router({
  computers: computersRouter,
  protected : protectedRouter
});

export type AppRouter = typeof appRouter;
