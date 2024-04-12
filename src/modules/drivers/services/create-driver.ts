import { Prisma } from '@prisma/client';
import prisma from '../../prisma';

export const createDriver = (driver: Prisma.DriverCreateInput) => {
  return prisma.driver.create({ data: driver });
};
