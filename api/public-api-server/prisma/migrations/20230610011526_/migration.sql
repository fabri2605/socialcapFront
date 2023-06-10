-- CreateTable
CREATE TABLE "sessions" (
    "uid" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_utc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "persons" (
    "uid" TEXT NOT NULL,
    "account_id" TEXT,
    "full_name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "telegram" TEXT,
    "avatar" TEXT,
    "preferences" TEXT,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "created_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_utc" TIMESTAMP(3) NOT NULL,
    "approved_utc" TIMESTAMP(3),

    CONSTRAINT "persons_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "communities" (
    "uid" TEXT NOT NULL,
    "account_id" TEXT,
    "full_name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "logo" TEXT,
    "created_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_utc" TIMESTAMP(3) NOT NULL,
    "approved_utc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "communities_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "members" (
    "communityUid" TEXT NOT NULL,
    "personUid" TEXT NOT NULL,
    "created_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedUtc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("communityUid","personUid")
);

-- CreateTable
CREATE TABLE "admins" (
    "communityUid" TEXT NOT NULL,
    "personUid" TEXT NOT NULL,
    "created_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedUtc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("communityUid","personUid")
);

-- CreateTable
CREATE TABLE "validators" (
    "communityUid" TEXT NOT NULL,
    "personUid" TEXT NOT NULL,
    "created_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedUtc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "validators_pkey" PRIMARY KEY ("communityUid","personUid")
);

-- CreateTable
CREATE TABLE "auditors" (
    "communityUid" TEXT NOT NULL,
    "personUid" TEXT NOT NULL,
    "created_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedUtc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auditors_pkey" PRIMARY KEY ("communityUid","personUid")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_uid_key" ON "sessions"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "persons_uid_key" ON "persons"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "persons_email_key" ON "persons"("email");

-- CreateIndex
CREATE UNIQUE INDEX "communities_uid_key" ON "communities"("uid");

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_communityUid_fkey" FOREIGN KEY ("communityUid") REFERENCES "communities"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_personUid_fkey" FOREIGN KEY ("personUid") REFERENCES "persons"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_communityUid_fkey" FOREIGN KEY ("communityUid") REFERENCES "communities"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_personUid_fkey" FOREIGN KEY ("personUid") REFERENCES "persons"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "validators" ADD CONSTRAINT "validators_communityUid_fkey" FOREIGN KEY ("communityUid") REFERENCES "communities"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "validators" ADD CONSTRAINT "validators_personUid_fkey" FOREIGN KEY ("personUid") REFERENCES "persons"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditors" ADD CONSTRAINT "auditors_communityUid_fkey" FOREIGN KEY ("communityUid") REFERENCES "communities"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditors" ADD CONSTRAINT "auditors_personUid_fkey" FOREIGN KEY ("personUid") REFERENCES "persons"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
