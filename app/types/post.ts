import { HeroImageSchema } from './airtable';
import { z } from 'zod';

export const PostSchema = z
    .object({
        id: z.string(),
        title: z.string(),
        contentType: z.string(),
        draft: z.optional(z.boolean()),
        slug: z.string(),
        published: z.string(),
        byline: z.optional(z.string()),
        hero: z.optional(z.array(HeroImageSchema)),
        content: z.optional(z.string()),
        tags: z.optional(z.array(z.string())),
    })
    .strict();

export type Post = z.infer<typeof PostSchema>;
