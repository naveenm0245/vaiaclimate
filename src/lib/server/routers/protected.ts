import { createRecords, getReocrdsOfUser } from "@/lib/db/query/query";
import { protectedProcedure, publicProcedure, router } from "@/lib/server/trpc";
import { z } from "zod";

export const protectedRouter = router({
    createRecordTrpc : protectedProcedure.input(z.object({
        url : z.string(),
        fileName : z.string(), 
        remarks : z.string()
    })).mutation(async ({ctx, input}) => {
         const { id } = ctx.session.user;
         const data = {
             url : input.url,
             fileName : input.fileName,
             remarks : input.remarks,
             userId : id
         }
         const response = await createRecords(data);
         return response;
    }), 

    getReocrdsOfUserTrpc : protectedProcedure.query(async ({ctx}) => {
        const { id } = ctx.session.user;
        const response = await getReocrdsOfUser(id);
        return response;
    }), 
});
