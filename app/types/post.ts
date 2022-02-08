import { z } from 'zod';

const ThumbnailSchema = z
    .object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
    })
    .strict();

const HeroImageSchema = z
    .object({
        id: z.string(),
        width: z.number(),
        height: z.number(),
        url: z.string(),
        filename: z.string(),
        size: z.number(),
        type: z.string(),
        thumbnails: z
            .object({
                small: ThumbnailSchema,
                large: ThumbnailSchema,
                full: ThumbnailSchema,
            })
            .strict(),
    })
    .strict();

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
