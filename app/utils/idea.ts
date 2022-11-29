import { PUBLISHED_AND_DRAFT_FILTER, airtableBase } from './airtable';
import type { FieldSet, Record } from 'airtable';
import { marked } from 'marked';
import invariant from 'tiny-invariant';
import { SITE } from '~/constants/global';
import { Idea, IdeaSchema } from '~/types/idea';

invariant(process.env.AIRTABLE_IDEAS_TABLE_ID, 'AIRTABLE_IDEAS_TABLE_ID is required');
const ideasTable = airtableBase(process.env.AIRTABLE_IDEAS_TABLE_ID);

const convertRecordToIdea = (record: Record<FieldSet>): Idea => {
    const idea = {
        id: record.id,
        title: record.get('Title'),
        draft: record.get('Draft'),
        slug: record.get('Slug'),
        published: record.get('Published'),
        content: record.get('Content'),
    };

    const parsed = IdeaSchema.parse(idea);

    return { ...parsed, content: marked(parsed.content || '') };
};

interface FetchIdeasConfig {
    itemsToFetch?: number;
}

export const fetchIdeas = async ({ itemsToFetch }: FetchIdeasConfig = {}): Promise<Idea[]> => {
    return new Promise((resolve, reject) => {
        ideasTable
            .select({
                pageSize: itemsToFetch ?? SITE.ideasToFetch,
                sort: [{ field: 'Published', direction: 'desc' }],
                filterByFormula: PUBLISHED_AND_DRAFT_FILTER,
            })
            .eachPage(
                (records) => {
                    resolve(records.map(convertRecordToIdea));
                },

                (err: Error) => {
                    if (err) {
                        reject(err);
                    }
                },
            );
    });
};

export const fetchIdea = async (slug: string): Promise<Idea | null> => {
    const records = await ideasTable
        .select({
            filterByFormula: `AND(SEARCH("${slug}", {Slug}), ${PUBLISHED_AND_DRAFT_FILTER})`,
        })
        .firstPage();

    const [first] = records;

    return first ? convertRecordToIdea(first) : null;
};
