import { table } from './airtable';
import type { FieldSet, Record } from 'airtable';
import { marked } from 'marked';
import { PostSchema } from '~/types/post';

const convertRecordToPost = (record: Record<FieldSet>) => {
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

export const getPosts = async () => {
    const records = await table
        .select({
            pageSize: 10,
            sort: [{ field: 'Published', direction: 'desc' }],
        })
        .firstPage();

    return records.map((record, index) => {
        try {
            return convertRecordToPost(record);
        } catch (error) {
            console.error(`Error ${error} at post index ${index}`);
        }
    });
};

export const getPost = async (slug: string) => {
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
