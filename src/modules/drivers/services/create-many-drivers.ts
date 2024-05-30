import { Prisma } from '@prisma/client';
import prisma from '../../../prisma';

export const createManyDrivers = (drivers: Prisma.DriverCreateManyInput) => {
  return prisma.driver.createMany({ data: drivers, skipDuplicates: true });
};
