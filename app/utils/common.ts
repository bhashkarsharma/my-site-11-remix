import { GalleryItem } from '~/types/gallery';
import { Post } from '~/types/post';

export const getPublishedLocaleDate = (published: string) =>
    new Date(published).toLocaleDateString('en-US', {
        dateStyle: 'long',
    });

export const getHeroImage = (post: Post | GalleryItem) => post.hero?.[0].thumbnails.large.url;
