import Airtable from 'airtable';
import 'dotenv/config';
import invariant from 'tiny-invariant';

invariant(process.env.AIRTABLE_API_KEY, 'AIRTABLE_API_KEY is required');
invariant(process.env.AIRTABLE_BASE_ID, 'AIRTABLE_BASE_ID is required');

Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY,
});

export const airtableBase = Airtable.base(process.env.AIRTABLE_BASE_ID);

// posts that have been published until now, excluding drafts and scheduled posts
export const PUBLISHED_AND_DRAFT_FILTER = 'AND(IS_BEFORE({Published}, NOW()), (Draft = FALSE()))';

interface GetDateFilterProps {
    field?: string;
    pastDays?: number;
}

export const getDateFilter = (
    { field, pastDays }: GetDateFilterProps = { field: 'Published', pastDays: 5 },
) => `AND(
    IS_BEFORE({${field}}, NOW()),
    IS_AFTER(
        {${field}},
        DATETIME_DIFF(
            NOW(),
            -${pastDays},
            'days'
        )
    )
)`;
