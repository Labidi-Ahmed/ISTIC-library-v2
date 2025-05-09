import {PrismaClient} from '@prisma/client';
import {SearchParams} from '../types/bookTypes';

const prisma = new PrismaClient();

/**
 * Find books based on search parameters
 */
export const findBooks = async (
  where: any,
  options: {
    skip: number;
    take: number;
    orderBy: any;
  }
) => {
  const {skip, take, orderBy} = options;

  return prisma.book.findMany({
    where,
    include: {
      categories: true,
    },
    skip,
    take,
    orderBy,
  });
};

/**
 * Count total books matching search parameters
 */
export const countBooks = async (where: any) => {
  return prisma.book.count({where});
};

/**
 * Find books by category ID
 */
export const findBooksByCategory = async (
  categoryId: string,
  skip: number,
  take: number
) => {
  return prisma.book.findMany({
    where: {
      categories: {
        some: {
          id: categoryId,
        },
      },
    },
    include: {
      categories: true,
    },
    skip,
    take,
  });
};

/**
 * Count books by category ID
 */
export const countBooksByCategory = async (categoryId: string) => {
  return prisma.book.count({
    where: {
      categories: {
        some: {
          id: categoryId,
        },
      },
    },
  });
};
