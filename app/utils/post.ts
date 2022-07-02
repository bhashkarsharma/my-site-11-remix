import { table } from './airtable';
import type { FieldSet, Record } from 'airtable';
import { marked } from 'marked';
import { SITE } from '~/constants/global';
import { Post, PostSchema } from '~/types/post';

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

export const getPosts = async (): Promise<Post[]> => {
    return new Promise(async (resolve, reject) => {
        await table
            .select({
                pageSize: SITE.postsToFetch,
                sort: [{ field: 'Published', direction: 'desc' }],
            })
            .eachPage(
                (records, fetchNext: () => void) => {
                    resolve(records.map(convertRecordToPost));
                },

                (err: Error) => {
                    if (err) {
                        console.error(err);

                        reject(err);
                    }
                },
            );
    });
};

export const getPost = async (slug: string): Promise<Post | null> => {
    const records = await table
        .select({
            filterByFormula: `SEARCH("${slug}", {Slug})`,
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
