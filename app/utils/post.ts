import type { FieldSet, Record } from 'airtable';
import { marked } from 'marked';
import invariant from 'tiny-invariant';
import { PUBLISHED_AND_DRAFT_FILTER, airtableBase } from './airtable';
import { SITE } from '~/constants/global';
import { Post, PostSchema } from '~/types/post';

invariant(process.env.AIRTABLE_POSTS_TABLE_ID, 'AIRTABLE_POSTS_TABLE_ID is required');
const postsTable = airtableBase(process.env.AIRTABLE_POSTS_TABLE_ID);

const convertRecordToPost = (record: Record<FieldSet>): Post => {
    const post = {
        id: record.id,
        title: record.get('Title'),
        contentType: record.get('ContentType'),
        draft: record.get('Draft'),
        slug: record.get('Slug'),
        published: record.get('Published'),
        byline: record.get('Byline'),
        hero: record.get('Hero'),
        content: record.get('Content'),
        tags: record.get('Tags'),
    };

    const parsed = PostSchema.parse(post);

    return { ...parsed, content: marked(parsed.content || '') };
};

interface GetPostsConfig {
    itemsToFetch?: number;
}

export const fetchPosts = async ({ itemsToFetch }: GetPostsConfig = {}): Promise<Post[]> => {
    return new Promise((resolve, reject) => {
        postsTable
            .select({
                pageSize: itemsToFetch ?? SITE.imagesToFetch,
                sort: [{ field: 'Published', direction: 'desc' }],
                filterByFormula: PUBLISHED_AND_DRAFT_FILTER,
            })
            .eachPage(
                (records) => {
                    try {
                        resolve(records.map(convertRecordToPost));
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

export const fetchPost = async (slug: string): Promise<Post | null> => {
    const records = await postsTable
        .select({
            filterByFormula: `AND(SEARCH("${slug}", {Slug}), ${PUBLISHED_AND_DRAFT_FILTER})`,
        })
        .firstPage();

    const [first] = records;

    return first ? convertRecordToPost(first) : null;
};
