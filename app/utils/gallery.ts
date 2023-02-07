import type { Record as AirtableRecord, FieldSet } from 'airtable';
import { JSDOM } from 'jsdom';
import { marked } from 'marked';
import invariant from 'tiny-invariant';
import { PUBLISHED_AND_DRAFT_FILTER, airtableBase } from './airtable';
import { SITE } from '~/constants/global';
import {
    GalleryItem,
    GalleryItemSchema,
    P5SketchMetadata,
    P5SketchMetadataSchema,
} from '~/types/gallery';

invariant(process.env.AIRTABLE_GALLERY_TABLE_ID, 'AIRTABLE_GALLERY_TABLE_ID is required');
const galleryTable = airtableBase(process.env.AIRTABLE_GALLERY_TABLE_ID);

const P5_EDITOR_BASE = `https://editor.p5js.org`;
const P5_URL_REGEX = /p5js.org\/([\w-]+)\/full\/([\w-]+)/;

// fetch sketch assets from editor.p5js.org
export const fetchMetadataFromP5jsEditor = async (
    url: string,
): Promise<P5SketchMetadata | Record<string, never>> => {
    const matches = url.match(P5_URL_REGEX);

    if (!matches || matches?.length < 3) {
        return {};
    }
    const [, userId, sketchId] = matches;

    const projectUrl = `${P5_EDITOR_BASE}/editor/${userId}/projects/${sketchId}`;

    try {
        const p5SketchResponse = await fetch(projectUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response = await p5SketchResponse.json();

        return P5SketchMetadataSchema.parse(response);
    } catch (err) {
        console.error(err);
    }

    return {};
};

export const getSrcDocFromP5Sketch = async (url: string) => {
    let indexHtml = '';
    const metadata = await fetchMetadataFromP5jsEditor(url);

    if (Object.keys(metadata).length === 0) {
        return indexHtml;
    }

    const indexFile = metadata.files.find((file) => file.name === 'index.html');

    if (!indexFile?.content) {
        return indexHtml;
    }

    try {
        const dom = new JSDOM(indexFile.content);
        const styleTags =
            dom.window.document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]');
        const scriptTags = dom.window.document.querySelectorAll<HTMLScriptElement>('script');

        for (let i = 0; i < styleTags.length; i += 1) {
            const tag = styleTags[i];
            const cssFile = metadata.files.find((file) => file.name === tag.href);
            if (cssFile) {
                const styleTag = dom.window.document.createElement('style');
                styleTag.innerHTML = cssFile.content;

                tag.after(styleTag);
                tag.remove();
            }
        }

        for (let i = 0; i < scriptTags.length; i += 1) {
            const tag = scriptTags[i];
            const jsFile = metadata.files.find((file) => file.name === tag.src);
            if (jsFile) {
                const scriptTag = dom.window.document.createElement('script');
                scriptTag.innerHTML = jsFile.content;

                tag.after(scriptTag);
                tag.remove();
            }
        }

        indexHtml = dom.serialize();
    } catch (err) {
        console.error(err);
    }
    return indexHtml;
};

const convertAirtableRecordToGalleryItem = async (
    record: AirtableRecord<FieldSet>,
    expand: boolean,
): Promise<GalleryItem> => {
    const item = {
        id: record.id,
        title: record.get('Title'),
        type: record.get('Type'),
        draft: record.get('Draft'),
        slug: record.get('Slug'),
        published: record.get('Published'),
        hero: record.get('Hero'),
        heroUrl: record.get('HeroUrl'),
        content: record.get('Content'),
        contentUrl: record.get('ContentUrl'),
    };

    const parsed = GalleryItemSchema.parse(item);
    const content =
        expand && parsed.contentUrl?.includes(P5_EDITOR_BASE)
            ? await getSrcDocFromP5Sketch(parsed.contentUrl)
            : marked(parsed.content || '');

    return { ...parsed, content };
};

interface FetchGalleryConfig {
    itemsToFetch?: number;
}

export const fetchGallery = async ({ itemsToFetch }: FetchGalleryConfig = {}): Promise<
    GalleryItem[]
> => {
    return new Promise((resolve, reject) => {
        galleryTable
            .select({
                pageSize: itemsToFetch ?? SITE.imagesToFetch,
                sort: [{ field: 'Published', direction: 'desc' }],
                filterByFormula: PUBLISHED_AND_DRAFT_FILTER,
            })
            .eachPage(
                (records) => {
                    try {
                        const result: GalleryItem[] = [];

                        records.forEach(async (record) => {
                            const galleryItem = await convertAirtableRecordToGalleryItem(
                                record,
                                false,
                            );
                            result.push(galleryItem);
                        });

                        resolve(result);
                    } catch (err) {
                        console.error(err);
                    }
                },

                (err: Error) => {
                    if (err) {
                        reject(err);
                    }
                },
            );
    });
};

export const fetchGalleryItem = async (slug: string): Promise<GalleryItem | null> => {
    const records = await galleryTable
        .select({
            filterByFormula: `AND(SEARCH("${slug}", {Slug}), ${PUBLISHED_AND_DRAFT_FILTER})`,
        })
        .firstPage();

    const [first] = records;

    return first ? convertAirtableRecordToGalleryItem(first, true) : null;
};
