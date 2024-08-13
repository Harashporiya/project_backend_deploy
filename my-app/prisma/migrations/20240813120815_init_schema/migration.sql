-- CreateTable
CREATE TABLE "Movies" (
    "id" SERIAL NOT NULL,
    "Image" TEXT NOT NULL,
    "Hero_Name" TEXT NOT NULL,
    "Real_Name" TEXT NOT NULL,
    "Superpower" TEXT NOT NULL,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);
