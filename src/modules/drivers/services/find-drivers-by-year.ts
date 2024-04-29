import prisma from '../../prisma';

export const findDriversByYear = (seasonYear: string) => {
  return prisma.driver.findMany({ where: { seasonYear } });
};
