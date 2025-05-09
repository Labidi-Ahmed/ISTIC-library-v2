import {SearchParams} from '../types/bookTypes';
import {Request} from 'express';

/**
 * Builds a Prisma-compatible query object from search parameters
 */
export const buildSearchQuery = (params: SearchParams): any => {
  const {
    query,
    title,
    author,
    category,
    language,
    publishedAfter,
    publishedBefore,
    minRating,
    maxRating,
    publisher,
    isbn,
  } = params;

  const where: any = {};

  // General search term (searches across multiple fields)
  if (query) {
    where.OR = [
      {title: {contains: query as string, mode: 'insensitive'}},
      {author: {contains: query as string, mode: 'insensitive'}},
      {description: {contains: query as string, mode: 'insensitive'}},
    ];
  }

  // Specific field filters
  if (title) {
    where.title = {contains: title as string, mode: 'insensitive'};
  }

  if (author) {
    where.author = {contains: author as string, mode: 'insensitive'};
  }

  if (language) {
    where.language = {equals: language as string, mode: 'insensitive'};
  }

  if (publisher) {
    where.publisher = {contains: publisher as string, mode: 'insensitive'};
  }

  if (isbn) {
    where.isbn = {equals: isbn as string};
  }

  // Category filter - can be by category ID or name
  if (category) {
    where.categories = {
      some: {
        OR: [
          {id: category as string},
          {name: {contains: category as string, mode: 'insensitive'}},
        ],
      },
    };
  }

  // Date range filters
  if (publishedAfter || publishedBefore) {
    where.publishedDate = {};

    if (publishedAfter) {
      where.publishedDate.gte = new Date(publishedAfter as string);
    }

    if (publishedBefore) {
      where.publishedDate.lte = new Date(publishedBefore as string);
    }
  }

  // Rating range filters
  if (minRating || maxRating) {
    where.rating = {};

    if (minRating) {
      where.rating.gte = parseFloat(minRating as string);
    }

    if (maxRating) {
      where.rating.lte = parseFloat(maxRating as string);
    }
  }

  return where;
};
