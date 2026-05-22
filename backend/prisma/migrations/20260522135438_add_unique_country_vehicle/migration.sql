/*
  Warnings:

  - A unique constraint covering the columns `[countryId,vehicleTypeId]` on the table `TrafficData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `TrafficData_countryId_vehicleTypeId_key` ON `TrafficData`(`countryId`, `vehicleTypeId`);
