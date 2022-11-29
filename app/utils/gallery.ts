import { PUBLISHED_AND_DRAFT_FILTER, airtableBase } from './airtable';
import type { FieldSet, Record } from 'airtable';
import { marked } from 'marked';
import invariant from 'tiny-invariant';
import { SITE } from '~/constants/global';
import { GalleryItem, GalleryItemSchema } from '~/types/gallery';

invariant(process.env.AIRTABLE_GALLERY_TABLE_ID, 'AIRTABLE_GALLERY_TABLE_ID is required');
const galleryTable = airtableBase(process.env.AIRTABLE_GALLERY_TABLE_ID);

const convertRecordToGalleryItem = (record: Record<FieldSet>): GalleryItem => {
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

    return { ...parsed, content: marked(parsed.content || '') };
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
                    resolve(records.map(convertRecordToGalleryItem));
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

    return first ? convertRecordToGalleryItem(first) : null;
};
