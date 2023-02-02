-- DropForeignKey
ALTER TABLE "SpotList" DROP CONSTRAINT "SpotList_userId_fkey";

-- DropIndex
DROP INDEX "SpotListLocation_listId_locationId_key";

-- DropIndex
DROP INDEX "location_idx";

-- AlterTable
ALTER TABLE "SpotListLocation" ADD CONSTRAINT "SpotListLocation_pkey" PRIMARY KEY ("listId", "locationId");

-- AddForeignKey
ALTER TABLE "SpotList" ADD CONSTRAINT "SpotList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
