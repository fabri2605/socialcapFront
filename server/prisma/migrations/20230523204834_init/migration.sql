-- CreateTable
CREATE TABLE "sessions" (
    "uid" TEXT NOT NULL,
    "otp" VARCHAR(16) NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "created_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_utc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "persons" (
    "uid" TEXT NOT NULL,
    "account_id" VARCHAR(36) NOT NULL,
    "full_name" VARCHAR(128) NOT NULL,
    "state" VARCHAR(12) NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "phone" VARCHAR(24),
    "telegram" VARCHAR(24),
    "avatar" TEXT,
    "preferences" JSON,
    "created_utc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_utc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_uid_key" ON "sessions"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "persons_uid_key" ON "persons"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "persons_account_id_key" ON "persons"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "persons_email_key" ON "persons"("email");
