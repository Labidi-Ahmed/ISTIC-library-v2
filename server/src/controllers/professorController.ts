// src/controllers/professorController.ts
import {Request, Response} from 'express';
import {PrismaClient, Status, Role} from '@prisma/client';
import {prisma} from '@/lib/prisma';

interface Pagination {
  offset?: number;
  limit?: number;
  search?: string;
}

interface ProfessorSubmissionsQuery {
  status?: Status;
  offset?: number;
  limit?: number;
}

export const getAllProfessors = async (req: Request, res: Response) => {
  try {
    const {offset = 0, limit = 10, search} = req.query as unknown as Pagination;

    const searchTerm = typeof search === 'string' ? search.trim() : '';

    if (!searchTerm) {
      res.status(400).json({
        error: 'Search term is required and must be at least 2 characters long',
      });
      return;
    }

    const where = {
      role: Role.PROFESSOR,
      OR: [
        {
          username: {
            contains: searchTerm,
          },
        },
        {
          email: {
            contains: searchTerm,
          },
        },
      ],
    };

    // Debugging output
    console.log('Search query:', searchTerm);
    console.log('Prisma where clause:', JSON.stringify(where, null, 2));

    const [professors, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: Number(offset),
        take: Number(limit),
        select: {
          id: true,
          username: true,
          email: true,
          avatarUrl: true,
          createdAt: true,
          role: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.user.count({where}),
    ]);

    // Debugging output
    console.log('Returned professors:', professors);
    console.log('Total found:', total);

    // If no results found, return appropriate message
    if (total === 0) {
      res.json({
        data: [],
        meta: {
          total: 0,
          offset: Number(offset),
          limit: Number(limit),
          currentPage: 1,
          totalPages: 0,
          message: `No professors found matching "${searchTerm}"`,
        },
      });
      return;
    }

    res.json({
      data: professors,
      meta: {
        total,
        offset: Number(offset),
        limit: Number(limit),
        currentPage: Math.floor(Number(offset) / Number(limit)) + 1,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching professors:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};
export const getProfessorSubmissions = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const {
      status,
      offset = 0,
      limit = 10,
    } = req.query as ProfessorSubmissionsQuery;

    const where = {
      professorId: id,
      ...(status && {
        versions: {
          some: {
            status,
          },
        },
      }),
    };

    const [submissions, total] = await Promise.all([
      prisma.submission.findMany({
        where,
        skip: offset,
        take: limit,
        select: {
          id: true,
          title: true,
          createdAt: true,
          updatedAt: true,
          student: {
            select: {
              id: true,
              username: true,
              avatarUrl: true,
            },
          },
          versions: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
            select: {
              status: true,
              createdAt: true,
            },
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
      }),
      prisma.submission.count({where}),
    ]);

    res.json({
      data: submissions,
      meta: {
        total,
        offset: Number(offset),
        limit: Number(limit),

        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching professor submissions:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};
