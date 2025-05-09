import {Request, Response} from 'express';
import {
  findBooks,
  countBooks,
  findBooksByCategory,
  countBooksByCategory,
} from '../services/bookService';
import {buildSearchQuery} from '../utils/queryBuilder';
import {SearchParams} from '../types/bookTypes';

/**
 * Search books with flexible filter options
 */
export const searchBooks = async (req: Request, res: Response) => {
  try {
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
      sortBy = 'title',
      sortOrder = 'asc',
      limit = 10,
      offset = 0,
    } = req.query;

    const searchParams = buildSearchQuery({
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
    } as SearchParams);

    // Parse pagination parameters
    const take = Number(limit);
    const skip = Number(offset);

    // Validate and prepare sort options
    const validSortFields = [
      'title',
      'author',
      'publishedDate',
      'rating',
      'createdAt',
    ];
    const sortField = validSortFields.includes(sortBy as string)
      ? sortBy
      : 'title';
    const order =
      (sortOrder as string)?.toLowerCase() === 'desc' ? 'desc' : 'asc';

    // Get books from service layer
    const books = await findBooks(searchParams, {
      skip,
      take,
      orderBy: {[sortField as string]: order},
    });

    // Get total count for pagination
    const totalBooks = await countBooks(searchParams);

    // Return response
    return res.json({
      data: books,
      pagination: {
        totalBooks,
        limit: Number(limit),
        offset: Number(offset),
        hasMore: skip + take < totalBooks,
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({
      error: 'An error occurred while searching for books',
      details: error instanceof Error ? error.message : String(error),
    });
  }
};

/**
 * Get all books by category ID
 */
export const getBooksByCategory = async (req: Request, res: Response) => {
  try {
    const {categoryId} = req.params;
    const {limit = 10, offset = 0} = req.query;

    const take = Number(limit);
    const skip = Number(offset);

    // Get books by category
    const books = await findBooksByCategory(categoryId, skip, take);

    // Get total count
    const totalBooks = await countBooksByCategory(categoryId);

    return res.json({
      data: books,
      pagination: {
        totalBooks,
        limit: Number(limit),
        offset: Number(offset),
        hasMore: skip + take < totalBooks,
      },
    });
  } catch (error) {
    console.error('Error fetching books by category:', error);
    return res.status(500).json({error: 'Failed to fetch books by category'});
  }
};
