// Enums
export enum Role {
  STUDENT = 'STUDENT',
  PROFESSOR = 'PROFESSOR',
  ADMIN = 'ADMIN',
}

export enum Status {
  PENDING = 'PENDING',
  CHANGES_REQUESTED = 'CHANGES_REQUESTED',
  APPROVED = 'APPROVED',
}

// Base types
export interface User {
  id: string;
  avatarUrl: string | null;
  username: string;
  email: string;
  createdAt: Date;
  role: Role;
}

export interface Submission {
  id: string;
  studentId: string;
  professorId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Version {
  id: string;
  submissionId: string;
  filePath: string;
  studentMessage: string | null;
  professorMessage: string | null;
  status: Status;
  createdAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string | null;
  imageUrl: string | null;
  publishedDate: Date | null;
  language: string | null;
  isbn: string | null;
  pageCount: number | null;
  publisher: string | null;
  rating: number | null;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
}

// Types with relations
export interface UserWithRelations extends User {
  Session: Session[];
  submissionAsStudent: Submission | null;
  submissionsAsProfessor: Submission[];
}

export interface SubmissionWithRelations extends Submission {
  student: User;
  professor: User;
  versions: Version[];
}

export interface VersionWithRelations extends Version {
  submission: Submission;
}

export interface SessionWithRelations extends Session {
  user: User;
}

export interface BookWithRelations extends Book {
  categories: Category[];
}

export interface CategoryWithRelations extends Category {
  books: Book[];
}
