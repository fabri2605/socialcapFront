-- CreateTable
CREATE TABLE "Proposed" (
    "uid" TEXT NOT NULL,
    "as" TEXT NOT NULL,
    "personUid" TEXT NOT NULL,
    "communityUid" TEXT NOT NULL,
    "created_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Proposed_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Proposed_uid_key" ON "Proposed"("uid");
