import { z } from 'zod';
import { HeroImageSchema } from './airtable';

export const GalleryItemSchema = z
    .object({
        id: z.string(),
        title: z.string(),
        type: z.string(),
        draft: z.optional(z.boolean()),
        slug: z.string(),
        published: z.string(),
        byline: z.optional(z.string()),
        hero: z.optional(z.array(HeroImageSchema)),
        heroUrl: z.optional(z.string()),
        content: z.optional(z.string()),
        contentUrl: z.optional(z.string()),
    })
    .strict();

export type GalleryItem = z.infer<typeof GalleryItemSchema>;
