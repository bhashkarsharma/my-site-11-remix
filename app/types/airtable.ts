import { z } from 'zod';

const ThumbnailSchema = z
    .object({
        url: z.string(),
        width: z.number(),
        height: z.number(),
    })
    .strict();

export const HeroImageSchema = z
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
