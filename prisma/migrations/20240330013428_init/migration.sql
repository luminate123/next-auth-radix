-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
