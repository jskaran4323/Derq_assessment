/*
  Warnings:

  - You are about to drop the column `vehicleTypeId` on the `TrafficData` table. All the data in the column will be lost.
  - You are about to drop the `VehicleType` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[countryId,type]` on the table `TrafficData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `TrafficData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `TrafficData` DROP FOREIGN KEY `TrafficData_vehicleTypeId_fkey`;

-- DropIndex
DROP INDEX `TrafficData_countryId_vehicleTypeId_key` ON `TrafficData`;

-- AlterTable
ALTER TABLE `TrafficData` DROP COLUMN `vehicleTypeId`,
    ADD COLUMN `type` ENUM('CAR', 'TRUCK', 'BIKE', 'BUS') NOT NULL;

-- DropTable
DROP TABLE `VehicleType`;

-- CreateIndex
CREATE INDEX `TrafficData_type_idx` ON `TrafficData`(`type`);

-- CreateIndex
CREATE UNIQUE INDEX `TrafficData_countryId_type_key` ON `TrafficData`(`countryId`, `type`);
