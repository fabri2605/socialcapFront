-- AlterTable
ALTER TABLE "communities" ALTER COLUMN "updated_utc" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "persons" ALTER COLUMN "updated_utc" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "updated_utc" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Claim" (
    "uid" TEXT NOT NULL,
    "community_uid" TEXT NOT NULL,
    "applicant_uid" TEXT NOT NULL,
    "plan_uid" TEXT NOT NULL,
    "state" INTEGER NOT NULL,
    "account_id" TEXT,
    "alias" TEXT,
    "created_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "voted_utc" TIMESTAMP(3),
    "issued_utc" TIMESTAMP(3),
    "due_utc" TIMESTAMP(3),
    "required_votes" INTEGER DEFAULT 0,
    "required_positives" INTEGER DEFAULT 0,
    "positive_votes" INTEGER DEFAULT 0,
    "negative_votes" INTEGER DEFAULT 0,
    "ignored_votes" INTEGER DEFAULT 0,
    "evidence_data" TEXT DEFAULT '',

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Plan" (
    "uid" TEXT NOT NULL,
    "community_uid" TEXT NOT NULL,
    "state" INTEGER NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "alias" TEXT,
    "description" TEXT DEFAULT '',
    "image" TEXT DEFAULT '',
    "template" TEXT DEFAULT '',
    "evidence" TEXT DEFAULT '[]',
    "strategy" TEXT DEFAULT '{}',
    "created_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved_utc" TIMESTAMP(3),
    "fee" INTEGER DEFAULT 0,
    "rewards_share" INTEGER DEFAULT 0,
    "community_share" INTEGER DEFAULT 0,
    "protocol_share" INTEGER DEFAULT 0,
    "total" INTEGER DEFAULT 0,
    "expiration" INTEGER DEFAULT 0,
    "revocable" BOOLEAN DEFAULT false,
    "starts_utc" TIMESTAMP(3),
    "ends_utc" TIMESTAMP(3),

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Credential" (
    "uid" TEXT NOT NULL,
    "community_uid" TEXT NOT NULL,
    "claim_id" TEXT NOT NULL,
    "applicant_id" TEXT NOT NULL,
    "type" TEXT DEFAULT '',
    "description" TEXT DEFAULT '',
    "image" TEXT DEFAULT '',
    "alias" TEXT DEFAULT '',
    "starts" INTEGER DEFAULT 0,
    "metadata" TEXT DEFAULT '{}',
    "issued_utc" TIMESTAMP(3),
    "expires _utc" TIMESTAMP(3),

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Task" (
    "uid" TEXT NOT NULL,
    "claim_uid" TEXT NOT NULL,
    "assignee_uid" TEXT NOT NULL,
    "state" INTEGER NOT NULL DEFAULT 0,
    "assigned_utc" TIMESTAMP(3),
    "completed_utc" TIMESTAMP(3),
    "due_utc" TIMESTAMP(3),
    "rewarded" INTEGER DEFAULT 0,
    "reason" INTEGER DEFAULT 0,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Claim_uid_key" ON "Claim"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_uid_key" ON "Plan"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Credential_uid_key" ON "Credential"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Task_uid_key" ON "Task"("uid");
