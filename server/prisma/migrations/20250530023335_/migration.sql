/*
  Warnings:

  - You are about to drop the column `versionNumber` on the `Version` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Version" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "submissionId" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "studentMessage" TEXT,
    "professorMessage" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Version_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Version" ("createdAt", "filePath", "id", "professorMessage", "status", "studentMessage", "submissionId") SELECT "createdAt", "filePath", "id", "professorMessage", "status", "studentMessage", "submissionId" FROM "Version";
DROP TABLE "Version";
ALTER TABLE "new_Version" RENAME TO "Version";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
