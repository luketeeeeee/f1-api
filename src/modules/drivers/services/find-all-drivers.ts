import prisma from '../../../prisma';

export const findAllDrivers = () => {
  return prisma.driver.findMany({});
};
