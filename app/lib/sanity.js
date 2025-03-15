// app/lib/sanity.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, 
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2024-01-01', 
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}