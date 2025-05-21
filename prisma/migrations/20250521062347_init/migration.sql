/*
  Warnings:

  - You are about to drop the column `feedbackVideoUrl` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `transcription` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `actorId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Assignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Monologue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mode` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transcript` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingCycle` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('BASIC', 'PLUS', 'PRO');

-- CreateEnum
CREATE TYPE "BillingCycle" AS ENUM ('MONTHLY', 'QUARTERLY', 'SEMIANNUAL', 'ANNUAL');

-- CreateEnum
CREATE TYPE "FeedbackMode" AS ENUM ('ASYNC', 'LIVE');

-- CreateEnum
CREATE TYPE "AddOnType" AS ENUM ('LIVE_FEEDBACK_UPGRADE', 'ONE_ON_ONE_SESSION');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'GUEST';

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_actorId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_themeId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "Monologue" DROP CONSTRAINT "Monologue_themeId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_actorId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_planId_fkey";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "feedbackVideoUrl",
DROP COLUMN "transcription",
ADD COLUMN     "liveAt" TIMESTAMP(3),
ADD COLUMN     "mode" "FeedbackMode" NOT NULL,
ADD COLUMN     "transcript" TEXT NOT NULL,
ADD COLUMN     "videoUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "videoUrl",
ADD COLUMN     "feedbackMode" "FeedbackMode" NOT NULL DEFAULT 'ASYNC',
ADD COLUMN     "tapeUrls" TEXT[];

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "actorId",
DROP COLUMN "endDate",
DROP COLUMN "planId",
DROP COLUMN "startDate",
ADD COLUMN     "billingCycle" "BillingCycle" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "plan" "Plan" NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "stripeSubId" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Theme" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "pdfUrls" TEXT[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bio",
DROP COLUMN "photoUrl",
DROP COLUMN "role",
ADD COLUMN     "imageUrl" TEXT;

-- DropTable
DROP TABLE "Assignment";

-- DropTable
DROP TABLE "Monologue";

-- DropTable
DROP TABLE "Plan";

-- CreateTable
CREATE TABLE "RolePivot" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ACTOR',
    "plan" "Plan",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RolePivot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddOnPurchase" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "AddOnType" NOT NULL,
    "targetSubmissionId" INTEGER,
    "redeemed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AddOnPurchase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RolePivot" ADD CONSTRAINT "RolePivot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddOnPurchase" ADD CONSTRAINT "AddOnPurchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
