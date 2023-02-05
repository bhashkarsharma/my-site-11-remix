import { HeroImageSchema } from './airtable';
import { z } from 'zod';

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

const P5SketchFileSchema = z.object({
    name: z.string(),
    content: z.string(),
    children: z.array(z.any()),
    fileType: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    isSelectedFile: z.boolean(),
    id: z.string(),
});

export const P5SketchMetadataSchema = z.object({
    name: z.string(),
    files: z.array(P5SketchFileSchema),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string(),
});

export type P5SketchMetadata = z.infer<typeof P5SketchMetadataSchema>;
