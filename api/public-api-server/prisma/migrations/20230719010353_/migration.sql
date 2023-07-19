-- CreateTable
CREATE TABLE "merkle_map" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "root" BIGINT NOT NULL,
    "size" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "created_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_utc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merkle_map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merkle_map_leaf" (
    "uid" TEXT NOT NULL,
    "merkle_map_id" INTEGER NOT NULL,
    "index" BIGINT NOT NULL,
    "key" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "data" TEXT,
    "created_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_utc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merkle_map_leaf_pkey" PRIMARY KEY ("uid")
);

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
    "state" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "telegram" TEXT,
    "preferences" TEXT,
    "created_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_utc" TIMESTAMP(3),
    "approved_utc" TIMESTAMP(3),

    CONSTRAINT "persons_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "communities" (
    "uid" TEXT NOT NULL,
    "account_id" TEXT,
    "admin_uid" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "created_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_utc" TIMESTAMP(3) NOT NULL,
    "approved_utc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "communities_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "members" (
    "communityUid" TEXT NOT NULL,
    "personUid" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'NONE',
    "created_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedUtc" TIMESTAMP(3),

    CONSTRAINT "members_pkey" PRIMARY KEY ("communityUid","personUid")
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
ALTER TABLE "merkle_map_leaf" ADD CONSTRAINT "merkle_map_leaf_merkle_map_id_fkey" FOREIGN KEY ("merkle_map_id") REFERENCES "merkle_map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_communityUid_fkey" FOREIGN KEY ("communityUid") REFERENCES "communities"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_personUid_fkey" FOREIGN KEY ("personUid") REFERENCES "persons"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
