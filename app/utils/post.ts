import { client } from './contentful';
import { Entry } from 'contentful';
import { marked } from 'marked';
import { Post, PostSchema } from '~/types/post';

enum ContentType {
    POST = 'post',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertEntryToPost = (entry: Entry<any>): Post => {
    const post = {
        id: entry.sys.id,
        title: entry.fields.title,
        contentType: entry.sys.contentType.sys.id,
        draft: false, // hardcoding, since only fetching published posts
        slug: entry.fields.slug,
        published: entry.fields.published,
        hero: entry.fields.heroImage,
        byline: '',
        content: entry.fields.longContent,
        tags: entry.metadata.tags.map((t) => t.sys.id),
    };

    const parsed = PostSchema.parse(post);

    return { ...parsed, content: marked(parsed.content || '') };
};

export const getPublishedLocaleDate = (published: string) =>
    new Date(published).toLocaleDateString('en-US', {
        dateStyle: 'long',
    });

export const getHeroImage = (post: Post) => post.hero?.[0].thumbnails.large.url;

export const getPosts = async (query?: string): Promise<Post[]> => {
    const config = query ? { query } : undefined;
    const entries = await client.getEntries(config);

    return entries.items.map(convertEntryToPost);
};

export const getPost = async (slug: string) => {
    const entries = await client.getEntries({
        content_type: ContentType.POST,
        'fields.slug': slug,
    });

    const [post] = entries.items;

    return post ? convertEntryToPost(post) : null;
};
