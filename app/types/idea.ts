import { z } from 'zod';

export const IdeaSchema = z
    .object({
        id: z.string(),
        title: z.string(),
        draft: z.optional(z.boolean()),
        slug: z.string(),
        published: z.string(),
        content: z.optional(z.string()),
    })
    .strict();

export type Idea = z.infer<typeof IdeaSchema>;
