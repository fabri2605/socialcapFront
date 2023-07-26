/*
  Warnings:

  - You are about to drop the column `communityUid` on the `Proposed` table. All the data in the column will be lost.
  - You are about to drop the column `personUid` on the `Proposed` table. All the data in the column will be lost.
  - Added the required column `community_uid` to the `Proposed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `person_uid` to the `Proposed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Proposed" DROP COLUMN "communityUid",
DROP COLUMN "personUid",
ADD COLUMN     "community_uid" TEXT NOT NULL,
ADD COLUMN     "person_uid" TEXT NOT NULL;
