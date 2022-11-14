import type { FieldSet, Record } from 'airtable';
import { marked } from 'marked';

import { table } from './airtable';
import { SITE } from '~/constants/global';
import { Post, PostSchema } from '~/types/post';

const DRAFT_FILTER = '(Draft = FALSE())';

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
    postsToFetch?: number;
}

export const getPosts = async ({ postsToFetch }: GetPostsConfig = {}): Promise<Post[]> => {
    return new Promise((resolve, reject) => {
        table
            .select({
                pageSize: postsToFetch ?? SITE.postsToFetch,
                sort: [{ field: 'Published', direction: 'desc' }],
                filterByFormula: DRAFT_FILTER,
            })
            .eachPage(
                (records) => {
                    resolve(records.map(convertRecordToPost));
                },

                (err: Error) => {
                    if (err) {
                        reject(err);
                    }
                },
            );
    });
};

export const getPost = async (slug: string): Promise<Post | null> => {
    const records = await table
        .select({
            filterByFormula: `AND(SEARCH("${slug}", {Slug}), ${DRAFT_FILTER})`,
        })
        .firstPage();

    const [first] = records;

    return first ? convertRecordToPost(first) : null;
};

export const getPublishedLocaleDate = (published: string) =>
    new Date(published).toLocaleDateString('en-US', {
        dateStyle: 'long',
    });

export const getHeroImage = (post: Post) => post.hero?.[0].thumbnails.large.url;
