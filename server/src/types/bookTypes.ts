/**
 * Search parameters interface for book filtering
 */
export interface SearchParams {
  query?: string | string[]; // General search term
  title?: string | string[]; // Title filter
  author?: string | string[]; // Author filter
  category?: string | string[]; // Category name or general search
  categoryId?: string | string[]; // Direct category ID filter
  language?: string | string[]; // Language filter
  publishedAfter?: string | string[]; // Published after date
  publishedBefore?: string | string[]; // Published before date
  minRating?: string | string[]; // Minimum rating
  maxRating?: string | string[]; // Maximum rating
  publisher?: string | string[]; // Publisher name
  isbn?: string | string[]; // ISBN identifier
  [key: string]: any; // Allow additional properties
}
