// app/lib/sanity.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'zblo2l9h', // Replace with your Project ID
  dataset: 'production', // Replace with your dataset name
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2024-01-01', // Use a specific API version (optional)
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

