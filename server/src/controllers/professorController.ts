// src/controllers/professorController.ts
import {Request, Response} from 'express';
import {PrismaClient, Status} from '@prisma/client';
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

    const where = search
      ? {
          OR: [
            {username: {contains: search, mode: 'insensitive'}},
            {email: {contains: search, mode: 'insensitive'}},
          ],
        }
      : {};

    const [professors, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: offset,
        take: limit,
        select: {
          id: true,
          username: true,
          email: true,
          avatarUrl: true,
          createdAt: true,
          _count: {
            select: {
              submissionsAsProfessor: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.user.count({where}),
    ]);

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
              versionNumber: 'desc',
            },
            take: 1,
            select: {
              status: true,
              versionNumber: true,
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
