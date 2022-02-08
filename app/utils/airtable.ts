import 'dotenv/config';
import Airtable from 'airtable';
import invariant from 'tiny-invariant';

invariant(process.env.AIRTABLE_API_KEY, 'AIRTABLE_API_KEY is required');
invariant(process.env.AIRTABLE_BASE_ID, 'AIRTABLE_BASE_ID is required');
invariant(process.env.AIRTABLE_TABLE_NAME, 'AIRTABLE_TABLE_NAME is required');

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

export const table = base(process.env.AIRTABLE_TABLE_NAME);
