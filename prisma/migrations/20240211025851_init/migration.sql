-- CreateTable
CREATE TABLE "seasons" (
    "id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "drivers_champion" TEXT NOT NULL,
    "constructors_champion" TEXT NOT NULL,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "constructor_titles" INTEGER,
    "drivers_titles" INTEGER,
    "seasonId" TEXT,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drivers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nationality" TEXT,
    "birthday" TEXT,
    "age" INTEGER,
    "world_titles" INTEGER,
    "wins" INTEGER,
    "podiums" INTEGER,
    "dnfs" INTEGER,
    "is_competing_in_f1" BOOLEAN,
    "is_alive" BOOLEAN,
    "photo" TEXT,
    "seasonId" TEXT,
    "teamId" TEXT,
    "carId" TEXT,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars" (
    "id" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT,
    "wins" INTEGER,
    "podiums" INTEGER,
    "dnfs" INTEGER,
    "seasonId" TEXT,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drivers_name_key" ON "drivers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cars_name_key" ON "cars"("name");

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
