CREATE EXTENSION postgis;

-- CreateTable
CREATE TABLE "SpotList" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "public" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpotList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpotListLocation" (
    "listId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "SpotLocation" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "coords" geometry(Point, 4326) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpotLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpotListLocation_listId_locationId_key" ON "SpotListLocation"("listId", "locationId");

-- CreateIndex
CREATE INDEX "location_idx" ON "SpotLocation" USING GIST ("coords");

-- AddForeignKey
ALTER TABLE "SpotListLocation" ADD CONSTRAINT "SpotListLocation_listId_fkey" FOREIGN KEY ("listId") REFERENCES "SpotList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotListLocation" ADD CONSTRAINT "SpotListLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "SpotLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
