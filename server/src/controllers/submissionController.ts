import {Request, Response} from 'express';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const createSubmission = async (req: Request, res: Response) => {
  try {
    const {studentId, professorId, title} = req.body;

    if (!studentId || !professorId || !title) {
      res.status(400).json({
        error:
          'Missing required fields: studentId, professorId, and title are required',
      });
      return;
    }

    const [student, professor] = await Promise.all([
      prisma.user.findUnique({where: {id: studentId}}),
      prisma.user.findUnique({where: {id: professorId}}),
    ]);

    if (!student) {
      res.status(404).json({error: 'Student not found'});
      return;
    }

    if (!professor) {
      res.status(404).json({error: 'Professor not found'});
      return;
    }

    const submission = await prisma.submission.create({
      data: {
        studentId,
        professorId,
        title,
      },
    });

    res.status(201).json({
      message: 'Submission created successfully',
      submission,
    });
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};

// Get a specific submission by ID
export const getSubmissionById = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;

    const submission = await prisma.submission.findUnique({
      where: {id},
      include: {
        student: {
          select: {
            id: true,
            username: true,
            email: true,
            avatarUrl: true,
          },
        },
        professor: {
          select: {
            id: true,
            username: true,
            email: true,
            avatarUrl: true,
          },
        },
        versions: {
          orderBy: {
            versionNumber: 'asc',
          },
        },
      },
    });

    if (!submission) {
      res.status(404).json({error: 'Submission not found'});
      return;
    }

    res.json({submission});
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};

// Update submission title
export const updateSubmission = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const {title} = req.body;

    if (!title) {
      res.status(400).json({error: 'Title is required'});
      return;
    }

    const submission = await prisma.submission.update({
      where: {id},
      data: {title},
    });

    res.json({
      message: 'Submission updated successfully',
      submission,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({error: 'Submission not found'});
      return;
    }
    console.error('Error updating submission:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};

export const getSubmissionsByStudent = async (req: Request, res: Response) => {
  try {
    const {studentId} = req.params;

    const submissions = await prisma.submission.findMany({
      where: {studentId},
      include: {
        professor: {
          select: {
            id: true,
            username: true,
            email: true,
            avatarUrl: true,
          },
        },
        versions: {
          orderBy: {
            versionNumber: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({submissions});
  } catch (error) {
    console.error('Error fetching student submissions:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};

export const getSubmissionsByProfessor = async (
  req: Request,
  res: Response
) => {
  try {
    const {professorId} = req.params;

    const submissions = await prisma.submission.findMany({
      where: {professorId},
      include: {
        student: {
          select: {
            id: true,
            username: true,
            email: true,
            avatarUrl: true,
          },
        },
        versions: {
          orderBy: {
            versionNumber: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({submissions});
  } catch (error) {
    console.error('Error fetching professor submissions:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};
