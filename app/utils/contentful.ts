import * as contentful from 'contentful';
import 'dotenv/config';
import invariant from 'tiny-invariant';

invariant(process.env.CONTENTFUL_SPACE_ID, 'CONTENTFUL_SPACE_ID is required');
invariant(process.env.CONTENTFUL_API_KEY, 'CONTENTFUL_API_KEY is required');

export const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_API_KEY,
});
