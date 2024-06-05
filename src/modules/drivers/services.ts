import { Prisma } from '@prisma/client';
import prisma from '../../prisma';

export const findAllDrivers = () => {
  return prisma.driver.findMany({});
};

export const findDriverById = (id: string) => {
  return prisma.driver.findUnique({ where: { id } });
};

export const findDriversByYear = (season_year: string) => {
  return prisma.driver.findMany({ where: { season_year } });
};

export const createDriver = (driver: Prisma.DriverCreateInput) => {
  return prisma.driver.create({ data: driver });
};

export const createManyDrivers = (drivers: Prisma.DriverCreateManyInput) => {
  return prisma.driver.createMany({ data: drivers, skipDuplicates: true });
};

export const udpateDriver = (id: string, driver: Prisma.DriverUpdateInput) => {
  return prisma.driver.update({ where: { id }, data: driver });
};

export const deleteDriver = (id: string) => {
  return prisma.driver.delete({ where: { id } });
};
